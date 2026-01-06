<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = "smtp.seudominio.com.br";
    $mail->SMTPAuth = true;
    $mail->Username = "contato@seudominio.com.br";
    $mail->Password = "SENHA_DO_EMAIL";
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom("contato@seudominio.com.br", "Exiba");
    $mail->addAddress("gerencia@exiba.com.br");
    $mail->addAddress("contato@exiba.com.br");
    $mail->addAddress("comercial@exiba.com.br");

    $mail->Subject = "Contato do site";
    $mail->Body = $_POST["mensagem"];

    $mail->send();
    echo "OK";
} catch (Exception $e) {
    echo "ERRO";
}
?>

