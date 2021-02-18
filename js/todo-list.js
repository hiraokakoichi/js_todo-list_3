let todoList = [];

const add_btn = document.getElementById('add_btn');


function addTodo(){
    // 入力されたタスクを取得
    const taskText = document.getElementById('task').value;

    // バリデーション
    if( taskText.length > 0 ){
        const todo = {
            task : taskText,
            status : '作業中' // 初期値
        };
        todoList.push(todo);
        
        // タスク入力ボックスをクリア
        document.getElementById('task').value = '';
    }

}

function showTodoList(){
    // タスク追加先のtable要素を取得
    const task_table = document.getElementById('task_table_body');

    let task_id = 1;
    for(let i=0; i<todoList.length; i++){
        /****** 1列目 ******/
        // テーブルに行を追加
        let new_row = task_table.insertRow();
        // 行にセルを追加
        let new_cell = new_row.insertCell();
        // テキストノード作成
        let new_text = document.createTextNode(task_id);
        // セルにテキストノードを追加
        new_cell.appendChild(new_text);
        /****** 2列目 ******/
        new_cell = new_row.insertCell();
        new_text = document.createTextNode(todoList[i]['task']);
        new_cell.appendChild(new_text);

        task_id++;
    }
}

function makeStatusBtn(){
    // タスク追加先のtable要素を取得
    const task_table = document.getElementById('task_table_body');
    for(let i=0; i<todoList.length; i++){
        // 行にセルを追加
        let new_cell = task_table.rows[i].insertCell();
        // ボタン要素生成
        let status_btn = document.createElement('button');
        status_btn.textContent = todoList[i]['status'];
        new_cell.appendChild(status_btn);
    }
    
}

function makeDeleteBtn(){
    // タスク追加先のtable要素を取得
    const task_table = document.getElementById('task_table_body');
    // 最後の行を取得
    for(let i=0; i<todoList.length; i++){
        // 行にセルを追加
        let new_cell = task_table.rows[i].insertCell();
        // ボタン要素生成
        let btn = document.createElement('button');
        btn.textContent = '削除';
        //status_btn.classList.add('delete');
        new_cell.appendChild(btn);

        btn.addEventListener('click', function() {
            //task_table.deleteRow(i);
            todoList.splice(i, 1);
            // tableを初期化
            clearTable();
            // todoを表示
            showTodoList();   
            // 状態ボタンを表示
            makeStatusBtn();
            // 削除ボタンを表示
            makeDeleteBtn();         
        });
    }

    
}

function clearTable(){
    // タスク追加先のtable要素を取得
    const task_table = document.getElementById('task_table_body');
    while( task_table.rows[0] ){
        task_table.deleteRow(0);
    }

}

add_btn.addEventListener('click', function() {
    // todoを追加
    addTodo();
    // tableを初期化
    clearTable();
    // todoを表示
    showTodoList();
    // 状態ボタンを表示
    makeStatusBtn();
    // 削除ボタンを表示
    makeDeleteBtn();
});

