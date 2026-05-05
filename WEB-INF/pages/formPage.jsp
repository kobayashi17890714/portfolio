<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="java.util.Objects" %>

<html>
	<head>
		<title>ポートフォリオ_フォーム</title>
	</head>
	<body>
		<%
		//Servletからのデータを取得
		String userName = (String) request.getAttribute("userName");
		String userEmail = (String) request.getAttribute("userEmail");
		
		//データが存在しない場合は空文字に置き換え
		userName = Objects.toString(userName, "");
		userEmail = Objects.toString(userEmail, "");
		%>
		
		<h2>お問い合わせ</h2>
		<form action = "<%= request.getContextPath() %>/confirm" method = "post">
			<table>
				<tr>
					<td>お名前</td>
					<td>
						<input type="text" name="user_name" value=<%= userName %>>
					</td>
				</tr>
				<tr>
					<td>メールアドレス</td>
					<td>
						<input type="text" name="user_email" value=<%= userEmail %>>
					</td>
				</tr>
				<tr>
					<td>お問い合わせ内容</td>
					<td>
						<%-- cols属性＝入力欄の幅（文字数）、rows属性＝入力欄の高さ（行数） --%>
						<textarea name="message" cols="30" rows="10"></textarea>
					</td>
				</tr>	
				
			</table>
			<input type="submit" value="送信">
		</form>
	</body>
</html>