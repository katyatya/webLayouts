<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	use PHPMailer\PHPMailer\SMTP;





	require 'PHPMailer/SMTP.php';
	require 'PHPMailer/src/Exception.php';
	require 'PHPMailer/src/PHPMailer.php';
	

	$mail = new PHPMailer(true);
	$mail->CharSet='UTF-8';
	$mail->setLanguage('ru','PHPMailer/language/');
	$mail->IsHTML(true);

	$mail->isSMTP();                   // Отправка через SMTP
	$mail->Host   = 'smtp.yandex.ru';  // Адрес SMTP сервера
	$mail->SMTPAuth   = true;          // Enable SMTP authentication
	$mail->Username   = 'katya-ryadchikova2';       // ваше имя пользователя (без домена и @)
	$mail->Password   = 'sdpzcqbxpjpujmer';    // ваш пароль
	$mail->SMTPSecure = 'ssl';         // шифрование ssl
	$mail->Port   = 465;               // порт подключения
	 
	$mail->setFrom('katya-ryadchikova2@yandex.ru', 'Иван Иванов');    // от кого
	$mail->addAddress('katya-ryadchikova2@yandex.ru', 'Вася Петров'); // кому

	$mail->setFrom("katettete@",'kate');
	$mail->addAddress('katya-ryadchikova2@')
	$mail->Subject="hello";

	$body='<h1>Ура письмо</h1>';
	$body.='<p>Name '.$_POST['name'].'</p>';
	$body.='<p>Mail '.$_POST['email'].'</p>';

	$mail->Body=$body;

	if(!$mail->send()){
		$message='Errorrr';
	}else{
		$message='Zaeb';
	}

	$response=['message' => $message];
	header('Content-type: application/json');
	// echo json_encode($response);
?>