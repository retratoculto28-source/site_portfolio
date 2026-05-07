<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

session_start();

// DB Config
$host    = 'localhost';
$db      = 'portfolio_db';
$user    = 'root';
$pass    = '';
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
    http_response_code(500);
    echo json_encode(['error' => 'Erro de conexão à base de dados.']);
    exit;
}

$action = isset($_GET['action']) ? $_GET['action'] : '';

// ─── PUBLIC: List approved reviews ───────────────────────────────────────────
if ($action === 'list') {
    $stmt = $pdo->query(
        "SELECT id, name, role, rating, comment, created_at
         FROM reviews
         WHERE approved = 1
         ORDER BY created_at DESC"
    );
    $reviews = $stmt->fetchAll();
    echo json_encode(['reviews' => $reviews]);
    exit;
}

// ─── PUBLIC: Submit a new review ─────────────────────────────────────────────
if ($action === 'submit' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $name    = htmlspecialchars(strip_tags($_POST['name']    ?? ''));
    $role    = htmlspecialchars(strip_tags($_POST['role']    ?? ''));
    $rating  = (int) ($_POST['rating'] ?? 0);
    $comment = htmlspecialchars(strip_tags($_POST['comment'] ?? ''));

    if (empty($name) || empty($comment) || $rating < 1 || $rating > 5) {
        http_response_code(400);
        echo json_encode(['error' => 'Dados inválidos. Preencha todos os campos.']);
        exit;
    }

    $stmt = $pdo->prepare(
        "INSERT INTO reviews (name, role, rating, comment, approved)
         VALUES (?, ?, ?, ?, 0)"
    );
    try {
        $stmt->execute([$name, $role, $rating, $comment]);
        echo json_encode(['success' => true, 'message' => 'Avaliação submetida! Será publicada após aprovação.']);
    } catch (\PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao guardar avaliação.']);
    }
    exit;
}

// ─── ADMIN: List all reviews (pending + approved) ────────────────────────────
if ($action === 'admin_list') {
    if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
        http_response_code(401);
        echo json_encode(['error' => 'Não autenticado.']);
        exit;
    }
    $stmt = $pdo->query(
        "SELECT * FROM reviews ORDER BY created_at DESC"
    );
    echo json_encode(['reviews' => $stmt->fetchAll()]);
    exit;
}

// ─── ADMIN: Approve a review ─────────────────────────────────────────────────
if ($action === 'approve' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
        http_response_code(401);
        echo json_encode(['error' => 'Não autenticado.']);
        exit;
    }
    $id = (int) ($_POST['id'] ?? 0);
    $pdo->prepare("UPDATE reviews SET approved = 1 WHERE id = ?")->execute([$id]);
    echo json_encode(['success' => true]);
    exit;
}

// ─── ADMIN: Delete a review ──────────────────────────────────────────────────
if ($action === 'delete' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
        http_response_code(401);
        echo json_encode(['error' => 'Não autenticado.']);
        exit;
    }
    $id = (int) ($_POST['id'] ?? 0);
    $pdo->prepare("DELETE FROM reviews WHERE id = ?")->execute([$id]);
    echo json_encode(['success' => true]);
    exit;
}

http_response_code(400);
echo json_encode(['error' => 'Ação inválida.']);
