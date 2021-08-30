<? 
return returnJson(['error' => 0, 'code_error' => 'send_success']);

function returnJson($array = null)
{

    echo json_encode($array);
}
