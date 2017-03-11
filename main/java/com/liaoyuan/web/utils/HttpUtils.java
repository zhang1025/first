package com.liaoyuan.web.utils;

import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.methods.RequestBuilder;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.util.EntityUtils;

import javax.net.ssl.SSLContext;
import java.io.IOException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created by zj on 2016/11/9
 * 使用apache httpcomponents jar
 */
@Slf4j
public class HttpUtils {

    private static HttpClientBuilder httpBulder = null;
    private static RequestConfig requestConfig = null;

    private static final String HTTP_CLIENT_ERROR = "ERROR";

    /**
     * 初始化 http 连接信息
     */
    static {
        RegistryBuilder<ConnectionSocketFactory> r = RegistryBuilder.create();
        PlainConnectionSocketFactory plainCoon = PlainConnectionSocketFactory.getSocketFactory();
        SSLContext sslContext ;
        //Https信任所有证书
        try {
            sslContext = new SSLContextBuilder().loadTrustMaterial(null, new TrustStrategy() {
                @Override
                public boolean isTrusted(X509Certificate[] x509Certificates, String s) throws CertificateException {
                    return true;
                }
            }).build();
            SSLConnectionSocketFactory sslConnFactory = new SSLConnectionSocketFactory(sslContext);
            r = r.register("https",sslConnFactory);
            r = r.register("http",plainCoon);
        } catch (Exception e) {
            e.printStackTrace();
        }
        PoolingHttpClientConnectionManager connectionManager = new PoolingHttpClientConnectionManager(r.build());
        connectionManager.setMaxTotal(200);
        connectionManager.setDefaultMaxPerRoute(100);

        httpBulder = HttpClients.custom();
        httpBulder.setConnectionManager(connectionManager);
        //设置http的状态参数
        requestConfig = RequestConfig.custom()
                .setSocketTimeout(5000)
                .setConnectTimeout(5000)
                .setConnectionRequestTimeout(5000)
                .build();
    }

    /**
     * 创建连接
     */
    private static CloseableHttpClient getConnection() {
        return httpBulder.build();
    }
    /**
     * http请求方法
     * @param map 参数
     * @param url 请求url
     * @param method post OR get
     */
    public static String getHttpRequestInfo(Map<String, String> map, String url, String method) {
        //封装参数
        List<NameValuePair> params = new ArrayList<>();
        Set<Map.Entry<String, String>> entrySet = map.entrySet();
        for (Map.Entry<String, String> e : entrySet) {
            NameValuePair pair = new BasicNameValuePair(e.getKey(), e.getValue());
            params.add(pair);
        }
        HttpUriRequest reqMethod = null;
        if ("post".equalsIgnoreCase(method)) {
            reqMethod = RequestBuilder.post().setUri(url)
                    .addParameters(params.toArray(new NameValuePair[params.size()]))
                    .setConfig(requestConfig).build();
        } else if ("get".equalsIgnoreCase(method)) {
            reqMethod = RequestBuilder.get().setUri(url)
                    .addParameters(params.toArray(new NameValuePair[params.size()]))
                    .setConfig(requestConfig).build();
        }
        return dealHttpRequest(reqMethod);
    }

    /**
     * http请求方法  无参数传递
     * @param url 请求url
     * @param method post OR get
     */
    public static String getHttpRequestInfo( String url, String method) {
        HttpUriRequest reqMethod = null;
        if ("post".equalsIgnoreCase(method)) {
            reqMethod = RequestBuilder.post().setUri(url)
                    .setConfig(requestConfig).build();
        } else if ("get".equalsIgnoreCase(method)) {
            reqMethod = RequestBuilder.get().setUri(url)
                    .setConfig(requestConfig).build();
        }
        return dealHttpRequest(reqMethod);

    }
    private static String dealHttpRequest(HttpUriRequest reqMethod){
        HttpClient client = getConnection();
        HttpResponse response =null;
        try {
            response = client.execute(reqMethod);
            int statusCode = response.getStatusLine().getStatusCode();
            if (statusCode == 200) {
                HttpEntity entity = response.getEntity();
                return EntityUtils.toString(entity, "utf-8");
            }else{
                System.out.println("Http Post Data Failure: ====statusCode="+statusCode);
                log.error("Http Post Data Failure: statusCode={}",statusCode);
                getHttpClientError(reqMethod,response);
                return HTTP_CLIENT_ERROR;
            }
        } catch (IOException e) {
            log.error("http请求错误----"+e.getMessage());
            getHttpClientError(reqMethod,response);
        }
        return HTTP_CLIENT_ERROR;
    }

    /**
     * 连接异常 释放处理
     */
    private static void getHttpClientError(HttpUriRequest reqMethod,HttpResponse response) {
        try {
            if(response != null){
                HttpEntity entityError = response.getEntity();
                if(entityError!=null){
                    EntityUtils.consume(entityError);
                }
            }
        }catch (IOException e1){
            e1.printStackTrace();
        }
        reqMethod.abort();
    }
}
