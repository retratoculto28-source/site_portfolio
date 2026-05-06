<?php
session_start();
header('Content-Type: application/json');

$admin_password = 'designer2026';
$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($action === 'login') {
    $pass = isset($_POST['password']) ? $_POST['password'] : '';
    if ($pass === $admin_password) {
        $_SESSION['loggedin'] = true;
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
    exit;
}

if ($action === 'logout') {
    session_destroy();
    echo json_encode(['success' => true]);
    exit;
}

if ($action === 'check') {
    $is_logged_in = isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true;
    echo json_encode(['logged_in' => $is_logged_in]);
    exit;
}

if ($action === 'messages') {
    if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
        echo json_encode(['error' => 'Não autenticado']);
        exit;
    }

    $host = 'localhost';
    $db   = 'portfolio_db';
    $user = 'root';
    $pass = '';
    $charset = 'utf8mb4';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    try {
        $pdo = new PDO($dsn, $user, $pass, $options);
        $stmt = $pdo->query("SELECT * FROM contacts ORDER BY created_at DESC");
        $messages = $stmt->fetchAll();
        echo json_encode(['messages' => $messages]);
    } catch (\PDOException $e) {
        echo json_encode(['error' => "Erro de conexão à base de dados: " . $e->getMessage()]);
    }
    exit;
}

echo json_encode(['error' => 'Ação inválida']);
