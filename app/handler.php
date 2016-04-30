<?php
/**
 * PATH upload_files with rules 777
 * Amount memory for upload? How much? Need set!!!
 */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die();
}
$upload_path = dirname(__FILE__) . '/upload_files';
$email = 'katia.yanichek@gmail.com';
if (!file_exists($upload_path)) {
    mkdir($upload_path);
}
$allow_extensions = array('jpg', 'zip', 'doc', 'pdf', 'docx');
if ($_FILES) {
    $success_uploaded = [];
    foreach ($_FILES as $upload_file) {
        $path_parts = pathinfo($upload_file['name']);
        $file_ext = mb_strtolower($path_parts['extension']);
        if (!in_array($file_ext, $allow_extensions)) {
            unlink($upload_file['tmp_name']);
        } else if (is_uploaded_file($upload_file['tmp_name'])) {
            $new_name = rand(10000, 99999) . '_' . $upload_file['name'];
            $new_path = "{$upload_path}/{$new_name}";
            $status = move_uploaded_file($upload_file['tmp_name'], $new_path);
            if ($status) {
                $http_path = 'http://' . $_SERVER['SERVER_NAME'] . '/upload_files/' . $new_name;
                $success_uploaded[] = $http_path;
            }
        }
    }
    echo json_encode($success_uploaded);
    die();
}
$data = json_decode(file_get_contents('php://input'), true);
if ($data) {
    if (filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        ob_start();
?>
Client name: <?php echo ($data['name']) ? $data['name'] : "Don't set"; ?>

Email: <?php echo $data['email'] ?>

Project name: <?php echo ($data['projectName']) ? $data['projectName'] : "Don't set"; ?>

Project describe:
<?php echo ($data['projectDescribe']) ? $data['projectDescribe'] : "Don't set"; ?>


Money: <?php echo ($data['selectedMoney']) ? $data['selectedMoney'] : "Don't set"; ?>

Deadline: <?php echo ($data['selectedDeadline']) ? $data['selectedDeadline'] : "Don't set"; ?>

Files:
<?php foreach($data['files'] as $file) { echo $file . "\n"; } ?>

Branding/Strategy:
<?php
        if ($data['selectedBrandingStrategy']) {
            $counter = 0;
            foreach($data['selectedBrandingStrategy'] as $bs) {
                foreach($bs as $key => $item) {
                    if ($key !== 'selected') {
                        if ($item === true) {
                            echo $key . "\n";
                            $counter++;
                        }
                    }
                }
            }
            if ($counter === 0) {
                echo "Don't set";
            }
        } else {
            echo "Don't set";
        }
?>

Design/Development:
<?php
        if ($data['selectedDesignDevelopment']) {
            $counter = 0;
            foreach($data['selectedDesignDevelopment'] as $bs) {
                foreach($bs as $key => $item) {
                    if ($key !== 'selected') {
                        if ($item === true) {
                            echo $key . "\n";
                            $counter++;
                        }
                    }
                }
            }
            if ($counter === 0) {
                echo "Don't set";
            }
        } else {
            echo "Don't set";
        }
?>


Print Design/Illustration:
<?php
        if ($data['selectedPrintIllustration']) {
            $counter = 0;
            foreach($data['selectedPrintIllustration'] as $bs) {
                foreach($bs as $key => $item) {
                    if ($key !== 'selected') {
                        if ($item === true) {
                            echo $key . "\n";
                            $counter++;
                        }
                    }
                }
            }
            if ($counter === 0) {
                echo "Don't set";
            }
        } else {
            echo "Don't set";
        }
?>


<?php
        $template = ob_get_contents();
        ob_end_clean();
        $status = mail($email, 'New potential', $template);
        echo json_encode(array('success' => $status));
    }
}