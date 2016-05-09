package cn.com.wilcom.screen.boss.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class ArrayUtil {
	private static final Logger logger = LogManager.getLogger(ArrayUtil.class);
	/**
	 * 取范围值如：6832 - 6839
	 */
	private static final Pattern RANGE_PATTERN = Pattern.compile("^\\s*(\\d+)\\s*-\\s*(\\d+)\\s*$");

	public static Object[] convertStringToArray(String propertie) {
		String[] arr = new String[0];

		if (propertie != null) {
			Matcher m = RANGE_PATTERN.matcher(propertie);
			if (m.find()) {
				try {
					int start = Integer.parseInt(m.group(1)), end = Integer.parseInt(m.group(2));
					if (end >= start) {
						arr = new String[end - start + 1];
						for (int i = start, j = 0; i <= end; i++, j++) {
							arr[j] = String.valueOf(i);
						}
					}
				} catch (NumberFormatException ok) {
					logger.error("非法字符", ok);
				}
			} else {
				arr = propertie.split(",");
			}
		}

		return arr;
	}

}
