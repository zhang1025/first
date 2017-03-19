package com.liaoyuan.web.interceptor;

import com.liaoyuan.web.entity.SessionUser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


/**
 * Created by admin
 */
@Slf4j
public class WebUrlInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse httpServletResponse, Object o) throws Exception {
        SessionUser sessionUser = (SessionUser)request.getSession().getAttribute(SessionUser.SESSION_ROOT_KEY);
        if(null == sessionUser){
            try {
                httpServletResponse.sendRedirect("/general/login");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
       return  true;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {
    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {
    }
}
