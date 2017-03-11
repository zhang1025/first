package com.liaoyuan.web.utils;

/**
 * Created by zhangji on 2015/6/8.
 */

import com.alibaba.fastjson.JSONObject;
import org.apache.commons.httpclient.*;
import org.apache.commons.httpclient.auth.AuthScope;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpConnectionParams;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.net.SocketTimeoutException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class HttpClientUtils {
    private static Logger log = LoggerFactory.getLogger(HttpClientUtils.class);
    /**
     * http请求异常
     */
    public static final String HTTP_CLIENT_ERROR = "ERROR";
    public static final String HTTP_CLIENT_TIME_OUT = "TIME_OUT";

    /**
     * 向指定URI POST数据
     *
     * @param url
     * @param data
     * @return
     */
    public static String postDataToUri(String url, NameValuePair[] data) {
        HttpClient httpClient = new HttpClient();
        //解决POST中文乱码问题
        httpClient.getParams().setContentCharset("utf8");
        httpClient.getParams().setParameter(HttpConnectionParams.CONNECTION_TIMEOUT, 1000);
        httpClient.getParams().setParameter(HttpConnectionParams.SO_TIMEOUT, 3000);
        PostMethod post = new PostMethod(url);
        post.setRequestBody(data);
        try {
            int statusCode = httpClient.executeMethod(post);
            if (statusCode != HttpStatus.SC_OK) {
                log.error("Post Data Failure: " + post.getStatusLine());
                return HTTP_CLIENT_ERROR;
            }
            InputStream inputStream = post.getResponseBodyAsStream();
            BufferedReader bufferReader = new BufferedReader(new InputStreamReader(inputStream));
            StringBuffer sb = new StringBuffer();
            String line = null;
            while ((line = bufferReader.readLine()) != null) {
                sb.append(line);
            }
            bufferReader.close();
            return sb.toString();
        }catch (ConnectTimeoutException cte){
            log.error("Post Data Failure: ConnectTimeoutException======="+ cte.getMessage());
            //logger.error("{} is+serviceid",serviceid)
            return HTTP_CLIENT_TIME_OUT;
        }  catch (Exception ex) {
            log.error("Post Data Exception: " + ex);
            return HTTP_CLIENT_ERROR;
        }
    }

    /**
     * 向指定URI POST数据
     *
     * @param url
     * @param data
     * @param encoding
     * @return
     */
    public static String postDataToUri(String url, NameValuePair[] data, String encoding) {
        HttpClient httpClient = new HttpClient();
        httpClient.getParams().setContentCharset(encoding);
        httpClient.getParams().setParameter(HttpConnectionParams.CONNECTION_TIMEOUT, 1000);
        httpClient.getParams().setParameter(HttpConnectionParams.SO_TIMEOUT, 3000);
        PostMethod post = new PostMethod(url);
        post.setRequestBody(data);
        try {
            int statusCode = httpClient.executeMethod(post);
            if (statusCode != HttpStatus.SC_OK) {
                System.out.println("Post Data Failure: " + post.getStatusLine()+"========"+statusCode);
                log.error("Post Data Failure: " + post.getStatusLine());
                return HTTP_CLIENT_ERROR;
            }
            InputStream inputStream = post.getResponseBodyAsStream();
            BufferedReader bufferReader = new BufferedReader(new InputStreamReader(inputStream, encoding));
            StringBuffer sb = new StringBuffer();
            String line = null;
            while ((line = bufferReader.readLine()) != null) {
                sb.append(line);
            }
            bufferReader.close();
            return sb.toString();
        }catch (ConnectTimeoutException cte){
            log.error("Post Data Failure: ConnectTimeoutException======="+ cte.getMessage());
            return HTTP_CLIENT_TIME_OUT;
        }  catch (Exception ex) {
            System.out.println("Post Data Failure: " + post.getStatusLine()+"========"+ex);
            log.error("Post Data Exception: " + ex);
            return HTTP_CLIENT_ERROR;
        }
    }

    /**
     * 向指定URI POST数据
     *
     * @param url
     * @param data
     * @param encoding
     * @param connectMiniSecondTime
     * @param reciveMiniSecondTime
     * @return
     */
    public static String postDataToUri(String url, NameValuePair[] data, String encoding, int connectMiniSecondTime, int reciveMiniSecondTime) {
        HttpClient httpClient = new HttpClient();
        httpClient.getParams().setContentCharset(encoding);
        if (connectMiniSecondTime > 0) {
            httpClient.getParams().setParameter(HttpConnectionParams.CONNECTION_TIMEOUT, connectMiniSecondTime);
        }
        if (reciveMiniSecondTime > 0) {
            httpClient.getParams().setParameter(HttpConnectionParams.SO_TIMEOUT, reciveMiniSecondTime);
        }
        PostMethod post = new PostMethod(url);
        post.setRequestBody(data);
        //post.setRequestHeader( "Content-type" , "application/json; charset=UTF-8" );
        try {
            int statusCode = httpClient.executeMethod(post);
            if (statusCode != HttpStatus.SC_OK) {
                System.out.println("Post Data Failure: " + post.getStatusLine()+"===="+statusCode);
                log.error("Post Data Failure: " + post.getStatusLine());
                return HTTP_CLIENT_ERROR;
            }
            InputStream inputStream = post.getResponseBodyAsStream();//post.getResponseBodyAsString()
            BufferedReader bufferReader = new BufferedReader(new InputStreamReader(inputStream, encoding));
            StringBuilder sb = new StringBuilder();
            String line = null;
            while ((line = bufferReader.readLine()) != null) {
                sb.append(line);
            }
            bufferReader.close();
            return sb.toString();
        }catch (ConnectTimeoutException cte){
            log.error("Post Data Failure: ConnectTimeoutException======="+ cte.getMessage()+"====时间="+ DateUtils.formatDate(new Date(), DateUtils.DEFAULT_FORMAT));
            System.out.println("Post Data Failure: ConnectTimeoutException======="+ cte.getMessage()+"====时间="+ DateUtils.formatDate(new Date(), DateUtils.DEFAULT_FORMAT));
            return HTTP_CLIENT_TIME_OUT;
        }catch (SocketTimeoutException cte){
            log.error("Post Data Failure: SocketTimeoutException======="+ cte.getMessage()+"====时间="+ DateUtils.formatDate(new Date(), DateUtils.DEFAULT_FORMAT));
            System.out.println("Post Data Failure: SocketTimeoutException======="+ cte.getMessage()+"====时间="+ DateUtils.formatDate(new Date(), DateUtils.DEFAULT_FORMAT));
            return HTTP_CLIENT_TIME_OUT;
        }catch (Exception ex) {
            log.error(DateUtils.formatDate(new Date(), DateUtils.DEFAULT_FORMAT)+"==error==Post Data Exception: " + ex.getMessage());
            ex.printStackTrace();
            return HTTP_CLIENT_ERROR;
        }
    }

    /**
     * 向指定URI GET数据
     *
     * @param url
     * @param encoding
     * @param connectMiniSecondTime
     * @param reciveMiniSecondTime
     * @return
     */
    public static String getDataFromUri(String url, String encoding, int connectMiniSecondTime, int reciveMiniSecondTime) {
        HttpClient httpClient = new HttpClient();
        httpClient.getParams().setContentCharset(encoding);
        if (connectMiniSecondTime > 0) {
            httpClient.getParams().setParameter(HttpConnectionParams.CONNECTION_TIMEOUT, connectMiniSecondTime);
        }
        if (reciveMiniSecondTime > 0) {
            httpClient.getParams().setParameter(HttpConnectionParams.SO_TIMEOUT, reciveMiniSecondTime);
        }
        GetMethod post = new GetMethod(url);
        try {
            int statusCode = httpClient.executeMethod(post);
            if (statusCode != HttpStatus.SC_OK) {
                System.out.println("Post Data Failure: " + post.getStatusLine()+"======"+statusCode);
                log.error("Post Data Failure: " + post.getStatusLine());
                return HTTP_CLIENT_ERROR;
            }
            InputStream inputStream = post.getResponseBodyAsStream();
            BufferedReader bufferReader = new BufferedReader(new InputStreamReader(inputStream, encoding));
            StringBuffer sb = new StringBuffer();
            String line = null;
            while ((line = bufferReader.readLine()) != null) {
                sb.append(line);
            }
            bufferReader.close();
            return sb.toString();
        }catch (ConnectTimeoutException cte){
            log.error("get Data Failure: ConnectTimeoutException======="+ cte.getMessage());
            return HTTP_CLIENT_TIME_OUT;
        }catch (SocketTimeoutException cte){
            log.error("Post Data Failure: SocketTimeoutException======="+ cte.getMessage()+"====时间="+ DateUtils.formatDate(new Date(), DateUtils.DEFAULT_FORMAT));
            System.out.println("Post Data Failure: SocketTimeoutException======="+ cte.getMessage()+"====时间="+ DateUtils.formatDate(new Date(), DateUtils.DEFAULT_FORMAT));
            return HTTP_CLIENT_TIME_OUT;
        }catch (Exception ex) {
            log.error("Post Data Exception: " + ex);
            ex.printStackTrace();
            return HTTP_CLIENT_ERROR;
        }
    }



    public static void main(String[] args) {
        long l = DateUtils.parse("2015-06-17 10:10:00", DateUtils.DEFAULT_FORMAT).getTime() - 35*60*1000;
        long l2 = DateUtils.parse("2015-06-17 10:10:00", DateUtils.DEFAULT_FORMAT).getTime();
        System.out.println(DateUtils.getStringDataFromLongTime(new Date(l).getTime()));

        int num = (int) (new Date(l).getTime() - new Date(l2).getTime()) / (5 * 60 * 1000);
        System.out.println(num);


//        try {
//            for(Enumeration<NetworkInterface> nis = NetworkInterface.getNetworkInterfaces();nis.hasMoreElements();){
//                NetworkInterface ni = nis.nextElement();
//                System.out.println(ni.getName()+"====获取此网络接口的名称");
//                System.out.println(ni.getDisplayName()+"====获取网络接口的显示名称");
//                System.out.println(ni.isLoopback()+"====返回网络接口是否是回送接口");
//                System.out.println(ni.isUp()+"=====是否已经开启并运行");
//                System.out.println(ni.isVirtual()+"====返回此接口是否是虚拟接口（也称为子接口）");
//                if (ni.isLoopback() || !ni.isUp())
//                    continue;
//               for( Enumeration<InetAddress> inetAddress =  ni.getInetAddresses(); inetAddress.hasMoreElements();){
//                   InetAddress ia = inetAddress.nextElement();
//                   System.out.println(ia instanceof Inet4Address);
//                   System.out.println(ia.getAddress()+"====address");
//                   System.out.println(ia.getHostAddress()+"====hostaddress");
//                   System.out.println(ia.getHostName()+"====hostname");
//                   if (ia instanceof Inet6Address) continue;
//               }
//
//            }
//
//        } catch (SocketException e) {
//            e.printStackTrace();
//        }

        BigDecimal bd = new BigDecimal(0.0*100);
        double dailyPayRateFixNum = bd.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();

        double aa =  0;
        double bb =0.0;
        System.out.println(aa==bb);

    }
}
