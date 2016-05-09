package cn.com.wilcom.screen.boss.util;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLDecoder;

public class ResourceUtil {
    // public final static String CLASS_PATH = getPath("/");

    /**
     * 获得相对于classpath的绝对路径
     *
     * @param location 相对路径
     * @return
     */
    public static String getPath(String location) {
        try {
            String path = ResourceUtil.class.getResource(location).toURI().getPath();

            return URLDecoder.decode(path, "UTF-8");
        } catch (URISyntaxException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 获得相对于classpath的URL
     *
     * @param location 相对路径
     * @return
     */
    public static URL getURL(String location) {
        return ResourceUtil.class.getResource(location);
    }
}
