<?php
// Configurações da Base de Dados
$host = 'localhost'; // ou o seu host, por ex: 127.0.0.1
$db   = 'portfolio_db';
$user = 'root'; // alterar para o seu user
$pass = ''; // alterar para a sua password
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    die("Erro de conexão à base de dados: " . $e->getMessage());
}

// Se o formulário for submetido
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Obter e higienizar os dados
    $name = htmlspecialchars(strip_tags($_POST['name'] ?? ''));
    $email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars(strip_tags($_POST['subject'] ?? ''));
    $message = htmlspecialchars(strip_tags($_POST['message'] ?? ''));

    // Validação básica
    if (!empty($name) && !empty($email) && !empty($subject) && !empty($message) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        
        // Inserir na base de dados (Evitando SQL Injection)
        $stmt = $pdo->prepare("INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)");
        
        try {
            $stmt->execute([$name, $email, $subject, $message]);
            
            // Redirecionar com mensagem de sucesso
            echo "<script>
                    alert('Mensagem enviada com sucesso! Entrarei em contacto em breve.');
                    window.location.href = '../contact.html';
                  </script>";
            exit;
        } catch(PDOException $e) {
            echo "<script>
                    alert('Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.');
                    window.history.back();
                  </script>";
        }
    } else {
        echo "<script>
                alert('Por favor, preencha todos os campos corretamente.');
                window.history.back();
              </script>";
    }
} else {
    // Redireciona caso o ficheiro seja acedido diretamente
    header("Location: ../contact.html");
    exit;
}
?>
