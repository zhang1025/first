package com.liaoyuan.web.utils;

import org.apache.commons.lang.StringUtils;
import org.joda.time.DateTime;
import org.joda.time.Days;
import org.joda.time.Minutes;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import java.sql.Timestamp;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by zhangji  on 2016/1/4
 * joda日期处理util
 */
public class JodaUtil {
    /**
     * 默认日期格式
     */
    public static final String DEFAULT_FORMAT = "yyyy-MM-dd HH:mm:ss";

    public static final String DEFAULT_FORMAT_2 = "yyyyMMdd";

    public static final String DEFAULT_FORMAT_3 = "M月d";

    public static final String DEFAULT_FORMAT_4 = "yyyy/MM/dd";
    public static final String DEFAULT_FORMAT_5 = "MM/dd/yyyy";

    public static final String YYYYMMDD = "yyyy-MM-dd";

    public static final String YYYYMMDDHM = "yyyy-MM-dd HH:mm";

    //add by machaozhe 2016-11-15
    public static DateTimeFormatter FORMATTER = DateTimeFormat.forPattern(DEFAULT_FORMAT);

    /**
     * @param str
     *            字符串 年月日 时分秒
     *            日期格式 yyyy-MM-dd HH:mm:dd
     * @return 日期
     */
    public static Date str2AllDate(String str) {
        if (null == str || "".equals(str)) {
            return null;
        }
        DateTimeFormatter dateTimeFormatter = DateTimeFormat.forPattern(DEFAULT_FORMAT);
        try {
            DateTime dateTime  = DateTime.parse(str, dateTimeFormatter);
            return dateTime.toDate();
        } catch (Exception e) {
            System.out.println("字符串转换Date错误，字符串格式需要是 yyyy-MM-dd HH:mm:ss");
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 把字符串转换成日期
     * str字符串格式需要是 yyyy-MM-dd
     */
    public static Date str2Date(String str) {
        if (null == str || "".equals(str)) {
            return null;
        }
        DateTimeFormatter dateTimeFormatter = DateTimeFormat.forPattern(YYYYMMDD);
        try {
            DateTime dateTime = DateTime.parse(str,dateTimeFormatter);
            return dateTime.toDate();
        } catch (Exception e) {
            System.out.println("字符串转换Date错误，字符串格式需要是 yyyy-MM-dd");
            e.printStackTrace();
        }
        return null;
    }
    /**
     * 把字符串转换成日期
     * str字符串格式需要是 yyyy-MM-dd HH:mm
     */
    public static Date str2YearHMDate(String str) {
        if (null == str || "".equals(str)) {
            return null;
        }
        DateTimeFormatter dateTimeFormatter = DateTimeFormat.forPattern(YYYYMMDDHM);
        try {
            DateTime dateTime = DateTime.parse(str,dateTimeFormatter);
            return dateTime.toDate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 把字符串转换成指定格式日期
     */
    public static Date str2DateFormat(String str,String format) {
        if (null == str || "".equals(str)) {
            return null;
        }
        if(StringUtils.isBlank(format)){
            format = DEFAULT_FORMAT;
        }
        if(str.length()!=format.length()){
            System.out.println("string字符串格式长度需与要格式化的format格式长度保持一致");
            return null;
        }
        DateTimeFormatter dateTimeFormatter = DateTimeFormat.forPattern(format);
        try {
            DateTime dateTime = DateTime.parse(str,dateTimeFormatter);
            return dateTime.toDate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    /**
     * 日期转换为字符串
     *
     * @param date
     *            日期
     * @param format
     *            日期格式 为空默认是 yyyy-MM-dd HH:mm:ss
     * @return 字符串
     */
    public static String date2Str(Date date, String format) {
        if (null == date) {
            return null;
        }
        if(StringUtils.isBlank(format)){
            format = DEFAULT_FORMAT;
        }
        return new DateTime(date).toString(format);
    }

    /**
     * date转成string
     */
    public static String formatDate(Date date){
        return new DateTime(date).toString(YYYYMMDD);
    }

    public static String formatDate(Date date, String formatStr){
        return new DateTime(date).toString(formatStr);
    }
    /**
     * 时间戳转换为字符串
     */
    public static String timestamp2Str(Timestamp time) {
        Date date = null;
        if (null != time) {
            date = new Date(time.getTime());
        }
        return new DateTime(date).toString(YYYYMMDD);
    }
    /**
     * 时间戳转换为字符串
     *
     */
    public static String timestamp2Str(Timestamp time,String format) {
        Date date = null;
        if (null != time) {
            date = new Date(time.getTime());
        }
        return new DateTime(date).toString(format);
    }

    /**
     * 字符串转换时间戳
     *字符串格式需要是 yyyy-MM-dd HH:mm:ss
     */
    public static Timestamp strAll2Timestamp(String str) {
        Date date = str2AllDate(str);
        return new Timestamp(date.getTime());
    }
    /**
     * 字符串转换时间戳
     * 字符串格式需要是 yyyy-MM-dd
     */
    public static Timestamp str2Timestamp(String str) {
        Date date = str2Date(str);
        return new Timestamp(date.getTime());
    }

    /**
     *
     * 获得指定日期的前几天
     * @param date 字符串格式  yyyy-MM-dd
     * @param days 指定天数
     */
    public static String getBeforeDay(String date,int days){
        Date dd = str2Date(date);
        return new DateTime(dd).minusDays(days).toString(YYYYMMDD);
    }
    /**
      * 获得指定日期的之后几天 返回字符串格式  yyyy-MM-dd
     */
    public static String getAfterDay(String date,int days){
        Date dd = str2Date(date);
        return new DateTime(dd).plusDays(days).toString(YYYYMMDD);
    }
    /**
     *
     * 获得指定日期的前几天
     * @param date 字符串格式  yyyy-MM-dd
     * @param days 指定天数
     * @param format 按照制定格式返回
     */
    public static String getBeforeDay(String date,int days,String format){
        Date d = str2Date(date);
        DateTime dt = new DateTime(d).minusDays(days);
        return dt.toString(format);
    }
    /**
     * 计算出date day天之前或之后的日期
     *
     * @param date
     *            日期
     *            天数，正数为向后几天，负数为向前几天
     * @return 返回Date日期类型
     */
    public static Date getDateBeforeOrAfterDays(Date date, int days) {
        return new DateTime(date).plusDays(days).toDate();
    }

    public static Long threeDaysAgo() {
        return Long.parseLong(date2Str(new DateTime().minusDays(3).toDate(), DEFAULT_FORMAT_2));
    }

    public static Long oneDaysAgo() {
        return Long.parseLong(date2Str(new DateTime().minusDays(1).toDate(), DEFAULT_FORMAT_2));
    }

    public static Long dealLongTime(Long time) {
        Date date = new Date(time);
        return Long.parseLong(date2Str(date, DEFAULT_FORMAT_2));
    }

    /**
     * parseDate
     * 字符串格式需要是 yyyy-MM-dd
     * 建议使用 方法str2DateFormat 不用此方法
     */
    public static Date parse(String strDate) {
        Date date = null;
        try {
            date = str2Date(strDate);
            return  date;
        } catch (Exception e) {
        }
        return null;
    }

    /**
     * 根据str字符串时间 计算 days 天之后的日期 Date
     * @param strDate String类型的日期
     * @param days 大于0 往后days天  小于0 往前days天
     * @return Dtae日期类型
     */
    public static Date parse(String strDate, String pattern, Integer days) {
        Date date = null;
        try {
            date = str2DateFormat(strDate, pattern);
            return new DateTime(date).plusDays(days).toDate();
        } catch (Exception e) {
        }
        return null;
    }

    /**
     * 根据type类型返回指定的数据
     * y返回对应date的年份 m返回对应的月份 else 返回对应的季度
     */
    public static int getMonthOrQuarterOrYearByDate(String date,String type){
        Calendar c = Calendar.getInstance();
        c.setTime(parse(date));
        if(type.equals("y")){
            return c.get(Calendar.YEAR);
        }else if(type.equals("m")){
            return c.get(Calendar.MONTH)+1;
        }else{
            int month = c.get(Calendar.MONTH)+1;
            if(month<=3){
                return 1;
            }else if(month<=6){
                return 2;
            }else if(month<=9){
                return 3;
            }else{
                return 4;
            }
        }
    }
    /**
     * 根据type类型返回指定的数据
     * y返回对应date的年份有多少天  m返回对应的月份有多少天  else 返回对应的季度有多少天
     */
    public static int getDayOfYearOrQuarterOrMonthByDate(String date,String type){
        Calendar c = Calendar.getInstance();
        c.setTime(parse(date));
        if(type.equals("y")){
            return c.getActualMaximum(Calendar.DAY_OF_YEAR);
        }else if(type.equals("m")){
            return c.getActualMaximum(Calendar.DAY_OF_MONTH);
        }else{
            int quarter = getMonthOrQuarterOrYearByDate(date,"q");
            if(quarter==1){
                return 90;
            }else if(quarter==2){
                return 91;
            }else if(quarter==3){
                return 92;
            }else{
                return 92;
            }
        }
    }
    public static int getExsitDayOfYearOrQuarterOrMonthByDate(String date,String type){
        Calendar c = Calendar.getInstance();
        c.setTime(parse(date));
        if(type.equals("y")){
            return c.get(Calendar.DAY_OF_YEAR);
        }else if(type.equals("m")){
            return c.get(Calendar.DAY_OF_MONTH);
        }else{
            int days = c.get(Calendar.DAY_OF_MONTH);
            int month = c.get(Calendar.MONTH);
            while(month%3!=0){
                c.add(Calendar.MONTH, -1);
                days = days + c.getActualMaximum(Calendar.DAY_OF_MONTH);
                month = c.get(Calendar.MONTH);
            }
            return days;
        }
    }

    public static String getMonthOrQuarterOrYearFirstDayByDate(String date,String type){
        Calendar c = Calendar.getInstance();
        c.setTime(parse(date));
        if(type.equals("y")){
            return c.get(Calendar.YEAR)+"-01-01";
        }else if(type.equals("m")){
            return c.get(Calendar.YEAR)+"-"+(c.get(Calendar.MONTH)+1)+"-01";
        }else{
            int month = c.get(Calendar.MONTH)+1;
            if(month<=3){
                return c.get(Calendar.YEAR)+"-01-01";
            }else if(month<=6){
                return c.get(Calendar.YEAR)+"-04-01";
            }else if(month<=9){
                return c.get(Calendar.YEAR)+"-07-01";
            }else{
                return c.get(Calendar.YEAR)+"-10-01";
            }
        }
    }
    public static String getPercent(int a,int b){
        DecimalFormat df = new DecimalFormat("#.##");
        if( b == 0 ){
            return df.format(100.0);
        }
        return df.format((double)a/b*100);
    }

    public static String getPercent(Double a,Double b){
        DecimalFormat df = new DecimalFormat("#.##");
        if(b == 0 || (a/b) > 1 ){
            return df.format(100.0);
        }
        return df.format(a/b*100);
    }

    public static String formatNumber(Double num){
        DecimalFormat df = new DecimalFormat("#.##");
        return df.format(num);
    }

    public static String getScale(double a,double b){
        DecimalFormat df = new DecimalFormat("#.00");
        if(b==0){
            return "0.00";
        }
        return df.format((a-b)/b*100);
    }


    /**
     * 获取当前日期date所在月份的最后一天
     * @param date 日期
     * @return yyyy-MM-dd HH:mm:ss
     */
    public static Date lastDayOfMonth(Date date) {
        return  new DateTime(date).dayOfMonth().withMaximumValue().toDate();
    }
    /**
     * 获取当前日期date所在月份的最后一天的零点时刻
     * @param date 日期
     * @return yyyy-MM-dd 00:00:00
     */
    public static Date lastDayOfMonthForDate(Date date) {
        String time =  new DateTime(date).dayOfMonth().withMaximumValue().toString(YYYYMMDD);
        return str2Date(time);
    }
    /**
     * 按月加,指定日期
     *
     * @param date 日期
     * @param value 指定增加值
     */
    public static Date addMonth(Date date, int value) {
        return new DateTime(date).plusMonths(value).toDate();

    }
    /**
     * 获取指定时间n个月内所有周末时间
     *
     * @param n 月数
     * @param startDate yyyy-MM-dd
     * @return List<String> string 为 yyyy-MM-dd 格式的日期
     */
    public static List<String> getDateListForChart(String startDate, int n) {
        List<String> list = new ArrayList<String>();
        try {
            Date start = str2Date(startDate);
            Date end = addMonth(start, n);
            Calendar c = Calendar.getInstance();
            c.setTime(end);
            int days = Days.daysBetween(new DateTime(start),new DateTime(end)).getDays();
            DateTime temp = null;
            for (int i = 0; i < days; i++) {
                temp = new DateTime(start).plusDays(i);
                int aa = temp.getDayOfWeek();
                if(aa == 7){
                    list.add(temp.toString(YYYYMMDD));
                }
            }
            Collections.sort(list);
            return list;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    /**
     * 获取一段时间
     * @param startDate : yyyy-MM-dd
     * @param endDate: yyyy-MM-dd
     */
    public static List<String> getDateMapForChart(String startDate,
                                                  String endDate) {
        List<String> list = new ArrayList<>();
        DateTime dateStart = new DateTime(startDate);
        DateTime dateEnd = new DateTime(endDate);
        int days = Days.daysBetween(dateStart,dateEnd).getDays();
        System.out.println(days+"======days");
        for (int i = 0; i <= days; i++) {
            list.add(dateStart.plusDays(i*1).toString(YYYYMMDD));
        }
        return list;
    }
    /**
     *
     * 获取指定日期为当年的第几天
     *
     * @param date yyyy-MM-dd
     */
    public static int dayOfYear(String date){
        int day = 0;
        try {
            day = new DateTime(date).getDayOfYear();
            return day;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return day;
    }
    /**
     * 取得当前日期是多少周
     */
    public static int getWeekNumber(Date date) {
        Calendar c = new GregorianCalendar();
        c.setFirstDayOfWeek(Calendar.MONDAY);
        c.setMinimalDaysInFirstWeek(7);
        c.setTime (date);
        return c.get(Calendar.WEEK_OF_YEAR);
    }
    /**
     *
     * 获取指定日为当年的第几周(注意处理周日)
     *
     * @param dateStr yyyy-MM-dd
     */
    public static int weekOfYear(String dateStr){
        Calendar now = new GregorianCalendar();
        try {
            Date date = str2Date(dateStr);
            now.setFirstDayOfWeek(Calendar.MONDAY);
            now.setMinimalDaysInFirstWeek(7);
            now.setTime(date);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return now.get(Calendar.WEEK_OF_YEAR);
    }
    /**
     * 获取日期是星期几
     */
    public static String getWeekOfDate(Date date) {
        String[] weekOfDays = { "周1", "周2", "周3", "周4", "周5", "周6", "周7"};
        return weekOfDays[new DateTime(date).getDayOfWeek()-1];
    }

    /**
     * add by zhangji
     * 根据某年当中的第几天推算日期
     * 参数格式 ： 2015_160
     */
    public static String getDateFromDaysOfYear(String year_date){
        if(StringUtils.isEmpty(year_date)){
            return null;
        }
        String[] str = year_date.split("_");
        if( str.length==0){
            return "";
        }
        String date = str[0]+"-01-01";
        int days = Integer.parseInt(str[1]);
        return new DateTime(date).plusDays(days-1).toString(YYYYMMDD);
    }

    /**
     * 把当前时间按照既定格式转成string 输出
     */
    public static String getCurrentCustomFormatDateTime(String pattern) {
        return new DateTime(new Date()).toString(pattern);
    }
    /**
     * 把long类型的时间 输出string字符
     * 默认格式 yyyy-MM-dd
     */
    public static String getStringDataFromLongTime(long time) {
        Date date = new Date(time);
        return new DateTime(date).toString(DEFAULT_FORMAT);
    }

    /**
     * 把long类型的时间 输出指定格式的string字符
     * 输出格式 pattern
     */
    public static String getStringDataFromLongTime(long time,String pattern) {
        Date date = new Date(time);
        return new DateTime(date).toString(pattern);
    }

    /**
     * add by zhangji
     * 返回下一小时    格式yyyy-MM-dd HH:mm:ss
     * @return 返回小时 HH
     */
    public static String getNextHourOfDate(Date date) {
        DateTime dateTime = new DateTime(date).plusHours(1);
        int hour = dateTime.getHourOfDay();
        return hour < 10 ? "0" + hour : hour + "";
    }

    /**
     * 返回下一小时的整点    格式yyyy-MM-dd HH:mm:ss
     * 10:35:00  得出 11:00:00
     */
    public static String getNextHourOfDayFormatString(Date date) {
        DateTime dateTime = new DateTime(date).plusHours(1);
        return  dateTime.toString("yyyy-MM-dd HH")+":00:00";
    }

    /**
     * 返回下一小时的整点    格式yyyy-MM-dd HH:mm:ss
     * 10:35:00  得出 11:00:00
     */
    public static Date getNextHourOfDayFormatDate(Date date) {
        DateTime dateTime = new DateTime(date).plusHours(1);
        return  str2AllDate(dateTime.toString("yyyy-MM-dd HH")+":00:00");
    }
    /**
     * 返回上一小时的整点    格式yyyy-MM-dd HH:mm:ss
     * 10:35:00  得出 10:00:00
     * @return HH
     */
    public static Date getPrevHourOfDay(Date date) {
        DateTime dateTime = new DateTime(date).minusHours(1);
        return  str2AllDate(dateTime.toString("yyyy-MM-dd HH")+":00:00");
    }

    /**
     * 返回上一小时    格式yyyy-MM-dd HH:mm:ss
     * @return HH
     */
    public static String getPrevHourOfDate(Date date) {
        DateTime dateTime = new DateTime(date).minusHours(1);
        int hour = dateTime.getHourOfDay();
        return hour < 10 ? "0" + (hour<0 ?0:hour) : hour + "";
    }

    /**
     * 返回上一小时的整点    格式yyyy-MM-dd HH:mm:ss
     * 10:35:00  得出 10:00:00
     */
    public static String getPrevHourOfDayFormatString(Date date) {
        DateTime dateTime = new DateTime(date).minusHours(1);
        return dateTime.toString("yyyy-MM-dd HH")+":00:00";
    }

    /**
     * 获取某段时间内日期是周一的数组
     * @param end yyyy-MM-dd
     * @param start yyyy-MM-dd
     */
    public static Date [] getMondays(String end,String start){

        DateTime dateStart = new DateTime(start);
        DateTime dateEnd = new DateTime(end);
        int days = Days.daysBetween(dateStart,dateEnd).getDays();
        Date[] dateList = new Date[days];
        int temp = 0;
        for (int i = 0; i < days; i++) {
            if(dateStart.plusDays(i*1).getDayOfWeek()==1){
                dateList[temp] = dateStart.plusDays(i*1).toDate();
                temp++;
            }
        }
        dateList =  Arrays.copyOf(dateList, temp);
        return dateList;
    }

    /**
     * 根据当前日期获取上周一和周日
     */
    public static Date[] getLastWeek(Date end) {
        Date dates[] = new Date[2];
        DateTime dateTime = new DateTime(end);
        dates[0] = dateTime.minusDays(dateTime.getDayOfWeek()+6).toDate();
        dates[1] = dateTime.minusDays(dateTime.getDayOfWeek()).toDate();
        return dates;
    }

    /**
     * 根据当前日期获取本周一和周日
     * @author machaozhe
     * @param end
     * @return
     */
    public static Date[] getThisWeek(Date end) {
        Date dates[] = new Date[2];
        DateTime dateTime = new DateTime(end);
        dates[0] = dateTime.minusDays(dateTime.getDayOfWeek()-1).toDate();
        dates[1] = dateTime.plusDays(7-dateTime.getDayOfWeek()).toDate();
        return dates;
    }

    /**
     * 获取某一段时间内每月的第一天的日期数组
     * @param beginTime yyyy-MM-dd
     * @param endTime yyyy-MM-dd
     */
    public static  Date[] getMonths(String beginTime,String endTime){
        DateTime beginDate = new DateTime(beginTime);
        DateTime endDate = new DateTime(endTime);
        int days = Days.daysBetween(beginDate,endDate).getDays();
        Date dates[] = new Date[days];
        int temp = 0;
        for (int i = 0; i <= days; i++) {
            if(i!=0 && beginDate.plusDays(i*1).getDayOfMonth()==1){
                dates[temp] = beginDate.plusDays(i*1).toDate();
                temp ++ ;
            }
        }
        dates =  Arrays.copyOf(dates, temp);
        return dates;
    }
    /**
     * 时区转换
     *
     * author MCZ
     */
    public static Date transferZone(long date)
    {
        Calendar cal = Calendar.getInstance();
        TimeZone timez = cal.getTimeZone();
        long offset = timez.getOffset(cal.getTimeInMillis());
        return  new Date(date-offset);
    }

    /**
     * 获取时间间隔（分钟）
     * @author machaozhe
     * @param end
     * @param start
     * @return
     */
    public static int minutesBetween(DateTime end,DateTime start){
        if(end == null || start == null)
            return 0;
        return Minutes.minutesBetween(start,end).getMinutes();
    }

    /**
     * 把服务器时间转成北京时间
     * @author machaozhe
     * @return
     */
    public static Date convertCMTToCNTime(){
        Date date = new Date();
        Calendar cal = Calendar.getInstance();
        //服务器时区
        TimeZone zone = cal.getTimeZone();
        long serverOffset = zone.getOffset(cal.getTimeInMillis());
        //北京时区
        zone = TimeZone.getTimeZone("GMT+08");
        long cnOffset = zone.getOffset(cal.getTimeInMillis());
        //把服务器时间转换北京时间
        date = new Date(date.getTime()+cnOffset-serverOffset);
        return date;
    }

    /**
     * 计算两个日期相差天数
     * @param smdate
     * @param bdate
     * @return
     * 1.5  1.15 相差10天 如果算法需要按照9天计算，需要减1 或者下面方法不加1
     */
    public static int daysBetween(Date smdate,Date bdate) throws ParseException
    {
        return Days.daysBetween(new DateTime(smdate),new DateTime(bdate)).getDays()+1;
    }

    /**
     * 根据日期date 返回date的零点 和 24点
     * eg date = 2015-12-10
     * 返回 2015-12-10 00:00:00  2015-12-10 23:59:59
     * mysql 查询条件使用索引create_time大于0点小于24点  替换left(create_time,10)函数无法使用索引
     */
    public static String[] getStrDateOfBeginAndEnd(String date){
        String[] str = new String[2];
        if(date!=null && date.length()>10){
            date = date.substring(0,10);
        }
        DateTime dt = new DateTime(date);
        str[0] = dt.toString(YYYYMMDD);
        str[1] = dt.toString(YYYYMMDD)+" 23:59:59";
        return str;
    }
    public static String[] getDateOfBeginAndEnd(Date date){
        String[] str = new String[2];
        str[0] = formatDate(date,YYYYMMDD);
        str[1] = formatDate(date)+" 23:59:59";
        return str;
    }
    /**
     * 返回某一天零点时间date  Date类型的
     * 返回 2015-10-10
     */
    public static Date getZeroTimeOfDate(Date date){
        DateTime dt = new DateTime(date);
        return str2Date(dt.toString("yyyy-MM-dd"));
    }
    /**
     * 返回某一天零点时间date  String类型的
     * 返回 2015-10-10
     */
    public static String getZeroTimeOfStrDate(Date date){
        DateTime dt = new DateTime(date);
        return dt.toString("yyyy-MM-dd");
    }
    /**
     * 返回某一天23:59:59 时间date
     * 返回 2015-10-10 23:59:59
     */
    public static Date get24TimeOfDate(Date date){
        DateTime dt = new DateTime(date);
        return str2AllDate(dt.toString("yyyy-MM-dd") + " 23:59:59");
    }


    /**
     * 根据不同游戏 对应的时区 获取对应的时间
     * 默认 跟随当前服务器时间
     * timezone GMT+1 GMT-6
     * 返回当前日期的 dateTime
     */
    public static DateTime getTimeOfGameZone(String timezone){
        if(StringUtils.isBlank(timezone)){
            return new DateTime();
        }
        SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        sd.setTimeZone(TimeZone.getTimeZone(timezone));
        DateTimeFormatter dateTimeFormatter = DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss");
        return DateTime.parse(sd.format(new Date()),dateTimeFormatter);
    }

    public static void main(String[] args) {
        for (String s : getStrDateOfBeginAndEnd("2015-12-12 10:00:00")) {
            System.out.println(s+"==========sss");
        }
        System.out.println(str2AllDate("2015-12-15 12:30:00"));
        System.out.println(str2Date("2015-12-15"));
        System.out.println(date2Str(new Date(),"MM-dd"));
        System.out.println(getBeforeDay("2015-12-12",3)+"============getBeforeDay");
        System.out.println(threeDaysAgo());

        System.out.println(getWeekNumber(str2Date("2015-12-05")));

        List<String> list = getDateListForChart("2015-12-01",1);
        for (String s : list) {
            System.out.println(s);
        }
        Date[] date2  = getLastWeek(new Date());
        for (Date date1 : date2) {
            System.out.println(date1+"-------getLastWeek");
        }

        Date[] date3 = getMonths("2015-11-10", "2015-12-11");
        for (Date date1 : date3) {
            System.out.println(date1+"======date3");
        }
        Date begin = new Date();
        System.out.println(date2Str(addMonth(new Date(),1),DEFAULT_FORMAT));
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.DATE,calendar.getActualMaximum(Calendar.DATE));
        System.out.println(formatDate(calendar.getTime()));

        System.out.println(getDateMapForChart("2016-01-25","2016-01-25"));
    }
}


