<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../php/PHPMailer/src/Exception.php';
require __DIR__ . '/../php/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/../php/PHPMailer/src/SMTP.php';


if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("Acesso inválido.");
}


$nome     = trim($_POST['nome'] ?? '');
$email    = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
$telefone = trim($_POST['telefone'] ?? '');
$assunto  = trim($_POST['assunto'] ?? '');
$mensagem = trim($_POST['mensagem'] ?? '');

if (!$nome || !$email || !$telefone || !$assunto || !$mensagem) {
    die("Preencha todos os campos.");
}

$mail = new PHPMailer(true);

try {

    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'suportedados@exiba.com.br';
    $mail->Password   = 'qkbi fvjh fbwj shiv
';   
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // CONFIG EMAIL
    $mail->setFrom('admin@exiba.com.br', 'Site - Contato');
    $mail->addAddress('gerencia@exiba.com.br');
    $mail->addAddress("comercial@exiba.com.br");
    $mail->addReplyTo($email, $nome);

    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';
    $mail->Subject = "Contato pelo site - $assunto";

    $mail->Body = "
        <h3>Nova mensagem do site</h3>
        <p><strong>Nome:</strong> {$nome}</p>
        <p><strong>E-mail:</strong> {$email}</p>
        <p><strong>Telefone:</strong> {$telefone}</p>
        <p><strong>Assunto:</strong> {$assunto}</p>
        <p><strong>Mensagem:</strong><br>{$mensagem}</p>
    ";

    $mail->AltBody = "
Nome: $nome
Email: $email
Telefone: $telefone
Assunto: $assunto

Mensagem:
$mensagem
    ";

    $mail->send();
    echo "Mensagem enviada com sucesso!";
} catch (Exception $e) {
    echo "Erro ao enviar: {$mail->ErrorInfo}";
}
