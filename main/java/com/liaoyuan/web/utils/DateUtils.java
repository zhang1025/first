package com.liaoyuan.web.utils;

import java.sql.Timestamp;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 时间戳与字符串转换
 * 
 * @author Administrator
 * 
 */
public class DateUtils {

	/**
	 * 默认日期格式
	 */
	public static final String DEFAULT_FORMAT = "yyyy-MM-dd HH:mm:ss";

	public static final String DEFAULT_FORMAT_2 = "yyyyMMdd";

	public static final String DEFAULT_FORMAT_3 = "M月d";
	
	public static final String DEFAULT_FORMAT_4 = "yyyy/MM/dd";
	
	public static final String YYYYMMDD = "yyyy-MM-dd";
	
	public static final String YYYYMMDDHM = "yyyy-MM-dd HH:mm";

	/**
	 * 默认构造函数
	 */
	private DateUtils() {
	}

	public static Map<String, String> getDateMapForChart(Integer startDate,
			Integer endDate) {
		Map<String, String> map = new LinkedHashMap<String, String>();
		SimpleDateFormat sdf2 = new SimpleDateFormat(DEFAULT_FORMAT_2);
		SimpleDateFormat sdf3 = new SimpleDateFormat(DEFAULT_FORMAT_4);
		try {
			Date start = sdf2.parse(startDate.toString());
			Calendar c = Calendar.getInstance();
			c.setTime(start);
			String key = sdf2.format(c.getTime());
			String value = sdf3.format(c.getTime());
			map.put(key, value);
			if(startDate.intValue()<endDate.intValue()){
				boolean flag = true;
				while (flag) {
					c.add(Calendar.DATE, 1);
					if (sdf2.format(c.getTime()).equals(endDate.toString())) {
						flag = false;
					}
					key = sdf2.format(c.getTime());
					value = sdf3.format(c.getTime());
					map.put(key, value);
				}
			}
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return map;
	}

	public static Map<String, String> getDateMapForHour(Integer startDate,
			Integer endDate) {
		Map<String, String> map = new LinkedHashMap<String, String>();
		SimpleDateFormat sdf2 = new SimpleDateFormat(DEFAULT_FORMAT_2);
		SimpleDateFormat sdf3 = new SimpleDateFormat(DEFAULT_FORMAT_3);
		try {
			Date start = sdf2.parse(startDate.toString());
			Calendar c = Calendar.getInstance();
			c.setTime(start);
			String key = sdf2.format(c.getTime());
			String value = sdf3.format(c.getTime());
			for (int i = 0; i < 24; i++) {
				if (i < 10) {
					key = sdf2.format(c.getTime()) + "0" + i;
				} else {
					key = sdf2.format(c.getTime()) + i;
				}
				value = sdf3.format(c.getTime()) + "日" + i + "时";
				map.put(key, value);
			}
			if(startDate.intValue()<endDate.intValue()){
				boolean flag = true;
				while (flag) {
					c.add(Calendar.DATE, 1);
					if (sdf2.format(c.getTime()).equals(endDate.toString())) {
						flag = false;
					}
					for (int i = 0; i < 24; i++) {
						if (i < 10) {
							key = sdf2.format(c.getTime()) + "0" + i;
						} else {
							key = sdf2.format(c.getTime()) + i;
						}
						value = sdf3.format(c.getTime()) + "日" + i + "时";
						map.put(key, value);
					}
				}
			}		
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return map;
	}

	/**
	 * 字符串转换成日期 如果转换格式为空，则利用默认格式进行转换操作
	 * 
	 * @param str
	 *            字符串
	 * @param format
	 *            日期格式
	 * @return 日期
	 * @throws ParseException
	 */
	public static Date str2Date(String str, String format) {
		if (null == str || "".equals(str)) {
			return null;
		}
		// 如果没有指定字符串转换的格式，则用默认格式进行转换
		if (null == format || "".equals(format)) {
			format = DEFAULT_FORMAT;
		}
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		Date date = null;
		try {
			date = sdf.parse(str);
			return date;
		} catch (ParseException e) {
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
	 *            日期格式
	 * @return 字符串
	 */
	public static String date2Str(Date date, String format) {
		if (null == date) {
			return null;
		}
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		return sdf.format(date);
	}
	/**
	 * 时间戳转换为字符串
	 * 
	 * @param time
	 * @return
	 */
	public static String timestamp2Str(Timestamp time) {
		Date date = null;
		if (null != time) {
			date = new Date(time.getTime());
		}
		return date2Str(date, YYYYMMDD);
	}

    /**
     * 时间戳转换为指定格式字符串
     * @param time
     * @param format
     * @return
     */
	public static String timestamp2Str(Timestamp time,String format) {
		Date date = null;
		if (null != time) {
			date = new Date(time.getTime());
		}
		return date2Str(date, format);
	}

	/**
	 * 字符串转换时间戳
	 * 
	 * @param str
	 * @return
	 */
	public static Timestamp str2Timestamp(String str) {
		Date date = str2Date(str, DEFAULT_FORMAT);
		return new Timestamp(date.getTime());
	}

	/**
	 * 
	* @Title: getBeforeDay 
	* @Description:获得指定日期的前几天
	* @param date
	* @param days
	* @return
	* @throws
	 */
	public static String getBeforeDay(String date,int days){

		Date d = str2Date(date,"yyyy-MM-dd");
        //System.out.println(d);
        Calendar cd = Calendar.getInstance();
		cd.setTime(d);
		cd.add(Calendar.DAY_OF_MONTH, days);
		Date ad = cd.getTime();
		return date2Str(ad,"yyyy-MM-dd");
	}
	
	public static Long threeDaysAgo() {
		Long time = System.currentTimeMillis() - 3 * 24 * 60 * 60 * 1000L;
		Date date = new Date(time);
		return Long.parseLong(date2Str(date, DEFAULT_FORMAT_2));
	}

	public static Long oneDaysAgo() {
		Long time = System.currentTimeMillis() - 1 * 24 * 60 * 60 * 1000L;
		Date date = new Date(time);
		return Long.parseLong(date2Str(date, DEFAULT_FORMAT_2));
	}

	public static Long dealLongTime(Long time) {
		Date date = new Date(time);
		return Long.parseLong(date2Str(date, DEFAULT_FORMAT_2));
	}
	
	
	/**
	 *
	 * @param strDate
	 * @return
	 */
	public static Date parse(String strDate) {
		return parse(strDate, null);
	}

	/**
	 * parseDate
	 *
	 * @param strDate
	 * @param pattern
	 * @return
	 */
	public static Date parse(String strDate, String pattern) {
		Date date = null;
		try {
			if(pattern == null) {
				pattern = YYYYMMDD;
			}
			SimpleDateFormat format = new SimpleDateFormat(pattern);
			date = format.parse(strDate);
		} catch (Exception e) {
		}
		return date;
	}
	
	public static Date parse(String strDate, String pattern, Integer days) {
		Date date = null;
		try {
			if(pattern == null) {
				pattern = YYYYMMDD;
			}
			SimpleDateFormat format = new SimpleDateFormat(pattern);
			date = format.parse(strDate);
			Calendar c = Calendar.getInstance();
			c.setTime(date);
			c.add(Calendar.DATE, days);
			date = c.getTime();
		} catch (Exception e) {
		}
		return date;
	}
	
	public static int getMonthOrQuarterOrYearByDate(String date,String type){
		Calendar c = Calendar.getInstance();
		c.setTime(DateUtils.parse(date));
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
	public static int getDayOfYearOrQuarterOrMonthByDate(String date,String type){
		Calendar c = Calendar.getInstance();
		c.setTime(DateUtils.parse(date));
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
		c.setTime(DateUtils.parse(date));
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
		c.setTime(DateUtils.parse(date));
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
	* 取得当前日期是多少周
	*
	* @param date
	* @return
	*/
	public static int getWeekNumber(Date date) {
		Calendar c = new GregorianCalendar();
		c.setFirstDayOfWeek(Calendar.MONDAY);
		c.setMinimalDaysInFirstWeek(7);
		c.setTime (date);

		return c.get(Calendar.WEEK_OF_YEAR);
	}
	
	/**
	 * 按月加,指定日期
	 * 
	 * @param date
	 * @param value
	 * @return
	 */
	public static Date addMonth(Date date, int value) {
		Calendar now = Calendar.getInstance();
		now.setTime(date);
		now.add(Calendar.MONTH, value);
		return now.getTime();
	}
	
	/**
	 * 获取指定时间n个月内所有周末时间
	 * 
	 * @param n 月数
	 * @param endDate yyyy-MM-dd
	 * @return List<String> string 为 yyyy-MM-dd 格式的日期
	 */
	public static List<String> getDateListForChart(String endDate, int n) {
		List<String> list = new ArrayList<String>();
		SimpleDateFormat sdf4 = new SimpleDateFormat(YYYYMMDD);
		try {
			Date end = sdf4.parse(endDate);
			Date start = addMonth(end, n);
			Calendar c = Calendar.getInstance();
			c.setTime(end);
			list.add(endDate);
			while(true){
				c.add(Calendar.DATE, -7);
				if(c.getTime().getTime() <  start.getTime() ){
					break;
				}
				list.add(sdf4.format(c.getTime()));
			}
			Collections.sort(list);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return list;
	}
	
	/**
	 * 
	 * 获取指定日期为当年的第几天
	 * 
	 * @param date yyyy-MM-dd
	 * @return
	 */
	public static int dayOfYear(String date){
		Calendar now = Calendar.getInstance();
		SimpleDateFormat sdf = new SimpleDateFormat(YYYYMMDD);
		try {
			now.setTime(sdf.parse(date));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return now.get(Calendar.DAY_OF_YEAR);
	}
	
	/**
	 * 
	 * 获取指定日为当年的第几周(注意处理周日)
	 * 
	 * @param dateStr yyyy-MM-dd
	 * @return
	 */
	public static int weekOfYear(String dateStr){
		Calendar now = Calendar.getInstance();
		SimpleDateFormat sdf = new SimpleDateFormat(YYYYMMDD);
		try {
			Date date = sdf.parse(dateStr);
			now.setTime(date);
			if(now.get(Calendar.DAY_OF_WEEK) == 1){ //周日
				now.add(Calendar.DAY_OF_YEAR, -1); //去掉1天
			}
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return now.get(Calendar.WEEK_OF_YEAR);
	}
	
	public static String formatDate(Date date){
		SimpleDateFormat sdf = new SimpleDateFormat(YYYYMMDD);
		return sdf.format(date);
	}
	
	public static String formatDate(Date date, String formatStr){
		SimpleDateFormat sdf = new SimpleDateFormat(formatStr);
		return sdf.format(date);
	}
	
	/**
	 * 获取一段时间
	 * @param startDate : yyyy-MM-dd
	 * @param endDate: yyyy-MM-dd
	 * @return
	 */
	public static List<String> getDateMapForChart(String startDate,
			String endDate) {
		List<String> list = new ArrayList<String>();
		SimpleDateFormat yyyy_MM_dd = new SimpleDateFormat(YYYYMMDD); 
		SimpleDateFormat yyyyMMdd = new SimpleDateFormat(DEFAULT_FORMAT_2); 
		try {
			Date start = yyyy_MM_dd.parse(startDate);
			Date end = yyyy_MM_dd.parse(endDate);
			Calendar c = Calendar.getInstance();
			c.setTime(start);
			list.add(startDate);
			
			Integer starti = Integer.parseInt(yyyyMMdd.format(start));
			Integer endi = Integer.parseInt(yyyyMMdd.format(end));
			
			if( starti<endi ){
				boolean flag = true;
				while (flag) {
					c.add(Calendar.DATE, 1);
					String d = yyyy_MM_dd.format(c.getTime());
					if (d.equals(endDate)) {
						flag = false;
					}
					list.add(d);
				}
			}
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return list;
	}
	
	/**
	 * 计算出date day天之前或之后的日期
	 * 
	 * @param date
	 *            日期
	 * @param date
	 *            天数，正数为向后几天，负数为向前几天
	 * @return 返回Date日期类型
	 */
	public static Date getDateBeforeOrAfterDays(Date date, int days) {
		Calendar now = Calendar.getInstance();
		now.setTime(date);
		now.set(Calendar.DATE, now.get(Calendar.DATE) + days);
		return now.getTime();
	}

    public static void main(String[] args) throws Exception {

    }


    public static final SimpleDateFormat sdf_full = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    public static String getCurrentCustomFormatDateTime(String pattern) {
        Date currentDate = new Date(System.currentTimeMillis());
        SimpleDateFormat dateFormator = new SimpleDateFormat(pattern);
        return dateFormator.format(currentDate);
    }

    /**
     * 把long类型的时间 输出指定格式的string字符
     *
     * @param time
     * @return
     */
    public static String getStringDataFromLongTime(long time) {
        Date date = new Date(time);
        return sdf_full.format(date);
    }

    /**
     * 把long类型的时间 输出指定格式的string字符
     *
     * @param time
     * @return
     */
    public static String getStringDataFromLongTime(long time,String pattern) {
        Date date = new Date(time);
        SimpleDateFormat dateFormator = new SimpleDateFormat(pattern);
        return dateFormator.format(date);
    }

    /**
     * 把long类型的时间 输出指定格式的string字符
     *
     * @param time
     * @return
     */
    public static long getLongDataFromStringTime(String time) {
        Date date = null;
        try {
            date = sdf_full.parse(time);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date == null ? 0L : date.getTime();
    }

    /**
     * 指定格式的string字符 转成date类型的
     *
     * @param time pattern
     * @return
     */

    public static Date getDataFromString(String time, String pattern) {
        SimpleDateFormat dateFormator = new SimpleDateFormat(pattern);
        try {
            return dateFormator.parse(time);
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * add by zhangji
     * 返回下一小时    格式yyyy-MM-dd HH:mm:ss
     * @param date
     * @return HH
     */
    public static String getNextHourOfDate(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat(DEFAULT_FORMAT);
        String strDate = sdf.format(date);
        String minute = strDate.substring(11, 13);
        int hour = Integer.parseInt(minute);
        hour++;
        return hour < 10 ? "0" + hour : hour + "";
    }

    /**
     * 返回下一小时的整点    格式yyyy-MM-dd HH:mm:ss
     * 10:35:00  得出 11:00:00
     * @param date
     * @return HH
     */
    public static String getNextHourOfDayFormatString(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat(YYYYMMDD);
        StringBuffer sb = new StringBuffer();
        sb = sb.append(sdf.format(date)).append(" ").append(getNextHourOfDate(date)).append(":00:00");
        return sb.toString();
    }

    /**
     * 返回上一小时的整点    格式yyyy-MM-dd HH:mm:ss
     * 10:35:00  得出 10:00:00
     * @param date
     * @return HH
     */
    public static Date getNextHourOfDay(Date date) {
        String str = getNextHourOfDayFormatString(date);
        return  parse(str, DEFAULT_FORMAT);
    }

    /**
     * 返回上一小时    格式yyyy-MM-dd HH:mm:ss
     * @param date
     * @return HH
     */
    public static String getPrevHourOfDate(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat(DEFAULT_FORMAT);
        String strDate = sdf.format(date);
        String minute = strDate.substring(11, 13);
        int hour = Integer.parseInt(minute);
        hour--;
        return hour < 10 ? "0" + (hour<0 ?0:hour) : hour + "";
    }

    /**
     * 返回上一小时的整点    格式yyyy-MM-dd HH:mm:ss
     * 10:35:00  得出 10:00:00
     * @param date
     * @return HH
     */
    public static String getPrevHourOfDayFormatString(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat(YYYYMMDD);
        StringBuffer sb = new StringBuffer();
        sb = sb.append(sdf.format(date)).append(" ").append(getPrevHourOfDate(date)).append(":00:00");
        return sb.toString();
    }

    /**
     * 返回上一小时的整点    格式yyyy-MM-dd HH:mm:ss
     * 10:35:00  得出 10:00:00
     * @param date
     * @return HH
     */
    public static Date getPrevHourOfDay(Date date) {
        String str = getPrevHourOfDayFormatString(date);
        return  parse(str, DEFAULT_FORMAT);
    }

    /**
     * add by zhangji
     * 累加计算 得到 新数组
     * @param array
     * @return
     */
    public static int[] incrIntArray(int[] array) {
        int[] result = new int[array.length];
        for (int i = 0; i < array.length; i++) {
            result[i] = array[i] + (i > 0 ? result[i - 1] : 0);
        }
        return result;
    }
    /**
     * add by zhangji
     * 累加计算 得到 新数组
     * @param array
     * @return
     */
    public static double[] incrDoubleArray(double[] array) {
        double[] result = new double[array.length];
        for (int i = 0; i < array.length; i++) {
            result[i] = array[i] + (i > 0 ? result[i - 1] : 0);
        }
        return result;
    }

    public static long getQuot(String time1, String time2){
        long quot = 0;
        SimpleDateFormat ft = new SimpleDateFormat(DateUtils.YYYYMMDD);
        try {
            Date date1 = ft.parse( time1 );
            Date date2 = ft.parse( time2 );
            quot = date1.getTime() - date2.getTime();
            quot = quot / 1000 / 60 / 60 / 24;
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return quot;
    }

    public static String getDate(){
        SimpleDateFormat ft = new SimpleDateFormat(DateUtils.YYYYMMDD);
        Date dd = new Date();
        return ft.format(dd);
    }

    /**
     * 获取某段时间内日期是周一的数组
     * @param str1
     * @param str2
     * @return
     * @throws ParseException
     */
    public static Date [] getMondays(String str1,String str2) throws ParseException{
        Date end  = new SimpleDateFormat("yyyy-MM-dd").parse(str1);
        Date begin = new SimpleDateFormat("yyyy-MM-dd").parse(str2);
        Long a = new SimpleDateFormat("yyyy-MM-dd").parse(str1).getTime();
        Long b = new SimpleDateFormat("yyyy-MM-dd").parse(str2).getTime();
        long c = (long)a-b;
        long d = (long)24*60*60*1000;
        int aa = (int) Math.floor(c/d);
        Date str[] = new Date[aa];
        Calendar cal = Calendar.getInstance();
        cal.setTime(begin);
        int day = cal.get(Calendar.DAY_OF_WEEK);
        Date date = cal.getTime();

        int t =0;
        while(date.getTime()<end.getTime()){
            cal.add(cal.DATE,7-day+2 );
            date = cal.getTime();
            if(date.getTime()<end.getTime()){
                str[t] = date;
                day = cal.get(Calendar.DAY_OF_WEEK);
                t++;
            }
        }
        Date strs[] =  Arrays.copyOf(str, t);
//        for(int i=0;i<strs.length;i++){
//            System.out.println(strs[i]);
//        }
        return strs;
    }

    /**
     * 根据当前日期获取上周一和周日
     * @param end
     * @return
     */
    public static Date[] getLastWeek(Date end) {
        Date str[] = new Date[2];
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(end);
        int day = calendar.get(Calendar.DAY_OF_WEEK);
        calendar.add(calendar.DATE,-day+1);
        Date begin = str[1]=calendar.getTime();
        calendar.add(calendar.DATE, -6);
        str[0] = calendar.getTime();

        return str;
    }


    /**
     * 获取某一段时间内每月的第一天的日期数组
     * @param beginTime
     * @param endTime
     * @return
     */
    public static  Date[] getMonths(String beginTime,String endTime){
        Date str[];
        try {
            Calendar calendar = Calendar.getInstance();
            Date end  = new SimpleDateFormat("yyyy-MM-dd").parse(endTime);
            Date begin = new SimpleDateFormat("yyyy-MM-dd").parse(beginTime);
            long a = new SimpleDateFormat("yyyy-MM-dd").parse(endTime).getTime();
            long b = new SimpleDateFormat("yyyy-MM-dd").parse(beginTime).getTime();
            calendar.setTime(begin);
            calendar.setTime(end);
            long c = (long)a-b;
            long d = (long)15*24*60*60*1000;
            int aa = (int) Math.floor(c/d);
            str = new Date[aa];
            int t =0;
            String type = new SimpleDateFormat("yyyy-MM-dd").format(begin);
            if(type.split("-")[2].trim().equals("01")){
                str[0] = begin;
                t=1;
            }
            while(begin.getTime()<end.getTime()){
                Calendar cal = Calendar.getInstance();
                cal.setTime(begin);
                cal.add(Calendar.MONTH, 1);
                cal.set(Calendar.DAY_OF_MONTH,1);//设置为1号,当前日期既为本月第一天
                begin = cal.getTime();
                if(begin.getTime()<end.getTime()){
                    str[t] = begin;
                    t++;
                }

            }
            Date strs[] =  Arrays.copyOf(str, t);
//            for(int i=0;i<strs.length;i++){
//                System.out.println(strs[i]);
//            }
            return strs;
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }
    /**
     * 时区转换
     * 
     */
    public static Date transferZone(long date)
    {
    	Calendar cal = Calendar.getInstance();
        TimeZone timez = cal.getTimeZone();
        long offset = timez.getOffset(cal.getTimeInMillis());
        return  new Date(date-offset);
    }
    
    /**
     * 计算两个日期相差天数
     * @param smdate
     * @param bdate
     * @return
     * @throws ParseException
     */
    public static int daysBetween(Date smdate,Date bdate) throws ParseException    
    {    
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");  
        smdate=sdf.parse(sdf.format(smdate));  
        bdate=sdf.parse(sdf.format(bdate));  
        Calendar cal = Calendar.getInstance();    
        cal.setTime(smdate);    
        long time1 = cal.getTimeInMillis();                 
        cal.setTime(bdate);    
        long time2 = cal.getTimeInMillis();         
        long between_days=(time2-time1)/(1000*3600*24);  
        return Integer.parseInt(String.valueOf(between_days));           
    }    
    

    /**
     * 获取日期是星期几
     * @param date
     * @return
     */
	public static String getWeekOfDate(Date date) {      
	    String[] weekOfDays = {"周7", "周1", "周2", "周3", "周4", "周5", "周6"};        
	    Calendar calendar = Calendar.getInstance();      
	    if(date != null){        
	         calendar.setTime(date);      
	    }        
	    int w = calendar.get(Calendar.DAY_OF_WEEK) - 1;      
	    if (w < 0){        
	        w = 0;      
	    }      
	    return weekOfDays[w];    
	} 
	
	public static long getOneDayEnd(String date) {
        try {
            return sdf_full.parse(date + " 23:59:59").getTime()+999;
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return 0;
    }
}
