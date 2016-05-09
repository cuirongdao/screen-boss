package cn.com.wilcom.screen.boss.util;

import static com.google.common.base.Preconditions.checkNotNull;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

import com.google.common.base.Charsets;
import com.google.common.io.Files;

public class SQLUtil {
	private static final Map<String, String> sqls = new HashMap<String, String>();

	public static void load(String path) throws IOException {
		checkNotNull(path, "Provided path name for reading must NOT be null.");
		File dir = new File(path);
		System.out.println("Loading path:" + path);
		File[] files = dir.listFiles();
		if (files == null) {
			return;
		}
		for (int i = 0; i < files.length; i++) {
			if (files[i].isFile()) {
				String filename = files[i].getName();
				String sqlname = CamelCaseUtil.toCamelCase(filename.substring(0, filename.lastIndexOf(".")));

				String strfile = Files.toString(files[i], Charsets.UTF_8);

				Pattern SingleLineComment = Pattern.compile("--.*(\\r\\n|\\n)");
				Pattern multiLineComment = Pattern.compile("/\\*.*\\*/", Pattern.DOTALL);

				String tmpStr = SingleLineComment.matcher(strfile).replaceAll("").trim();
				String sql = multiLineComment.matcher(tmpStr).replaceAll("").trim();
				sqls.put(sqlname, sql);
			}
		}
		for (Map.Entry<String, String> entry : sqls.entrySet()) {
			System.out.println("--------------------" + entry.getKey() + "--------------------");
			System.out.println(entry.getValue());
		}
	}

	public static String getSql(String name) {
		String sql = sqls.get(name);
		if (sql == null) {
			try {
				load(ResourceUtil.getPath("/sqls"));
			} catch (IOException e) {
				e.printStackTrace();
			}
			sql = sqls.get(name);
		}
		return sql;
	}
}
