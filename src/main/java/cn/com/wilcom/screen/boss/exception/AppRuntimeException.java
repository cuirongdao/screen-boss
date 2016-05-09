package cn.com.wilcom.screen.boss.exception;

@SuppressWarnings("serial")
public class AppRuntimeException extends RuntimeException {
	private String localizedMessage;

	public AppRuntimeException() {
		super();
	}

	public AppRuntimeException(String message) {
		super();
	}

	public AppRuntimeException(String message, Throwable cause) {
		super();
	}

	public AppRuntimeException(Throwable cause) {
		super();
	}

	public AppRuntimeException(String localizedMessage, String message) {
		super();
		this.localizedMessage = localizedMessage;
	}

	public AppRuntimeException(String localizedMessage, String message,
			Throwable cause) {
		super();
		this.localizedMessage = localizedMessage;
	}

	public String getLocalizedMessage() {
		return localizedMessage;
	}

	public String toString() {
		String s = getClass().getName();
		String message = getLocalizedMessage();
		return (message != null) ? (s + ": " + message) : s;
	}
}
