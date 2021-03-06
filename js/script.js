let XorO = 0;
const player = (name) => {
    let symbol;
    if(XorO == 0){
        symbol = "X";
        XorO++;
    }else{
        symbol = "O";
        XorO--;
    }
    return {name,symbol};
}

let testbtn = document.getElementById("testbtn");

/*const displayBoard = (() => {
    let dp = document.getElementById('displayboard').children[0];
    console.log(dp);

    let publicFunctions = {
        
        addinfo : (info) => {
            if(info == ""){
                console.log("info not valid");
                return;
            }
            
            console.log(dp.childElementCount);
            let newli = document.createElement('li');
            newli.innerHTML = info;
            dp.appendChild(newli);
            
            if(dp.childElementCount > 4){
                dp.removeChild(dp.firstElementChild);
            }
        },

        resetboard : () => {
            for(let i = 0; i < 4; i++){
                dp.removeChild(dp.firstElementChild);
            }
        }
    }
    
    return publicFunctions;

})()*/

let player1;
let player2;

const gameBoard = (() => {    
    
    let players = [];
    let curr_player;
    let first_play = true;
    let boxes = document.querySelectorAll('.select-box');
    console.log(boxes);
    
    let turn = 0, r = 0, c = 0; 
    let table;

    let initTable = () => {
        turn = 0, r = 0, c = 0; 
        table = new Array(3);
        
        for(let i = 0; i < 3; i++){
            table[i] = new Array(3);
        }

        boxes.forEach(item => {
            if(item.firstChild != null)
                item.removeChild(item.firstChild);
            if(c < 3){ 
                item.c = c;   
                item.r = r;
                if(c+1 == 3){
                    c = 0;
                    r++;
                }else{
                    c++;
                }
                table[item.c][item.r] = 0;  
            }
        })
        
        if(first_play)
            setListeners(table);
    }

    let setListeners = () =>{
        first_play = false;
        boxes.forEach(item => {    
            item.addEventListener('click', function setSymbol(event) {
                console.log("clicked");
                if(table[item.r][item.c] == 0){
                    
                    let content = document.createElement('p');
                    content.innerHTML = curr_player.symbol;
                    content.classList.add('symbol')
                    
                    table[item.r][item.c] = content.textContent;
                    item.appendChild(content);
                    
                    turn++;
                    
                    if(turn > 4){
                        let winner = checkTable(table);
                        console.log(winner);
                        if(winner != false){
                            if(player1.symbol == winner){
                                console.log(`${player1.name} `+ "is the winner");
                            }else{
                                console.log(`${player2.name} `+ "is the winner");
                            }
                            initTable();
                        }
                        if(turn == 9){
                            console.log("parity");
                            initTable();
                        }
                        
                    }
                    
                    if(curr_player == player1)
                        curr_player = players[1];
                    else
                        curr_player = players[0];
                }
            })
        })
    }

    let checkRows = () => {
        for(let i = 0; i < 3; i++){
            if(table[i][0] == table[i][1] && table[i][1] == table[i][2]){
                return table[i][0];
            }
        }
        return false;
    }

    let checkColumns = () => {
        for(let i = 0; i < 3; i++){
            if(table[0][i] == table[1][i] && table[1][i] == table[2][i]){
                return table[0][i];
            }
        }
        return false;
    }

    let checkDiagonals = () => {
        if(table[0][0] == table[1][1] && table [1][1] == table[2][2]){
            return table[0][0];
        }else if(table[0][2] == table[1][1] && table[1][1] == table[2][0]){
            return table[0][2];
        }
        
        return false;
    }

    let checkTable = () => { 
        let result;
        result = checkRows(table);
        if(result == false){
            result = checkColumns(table);
            if(result == false){
                result = checkDiagonals(table)
            }
        }
        return result;
    }

    let publicFunctions = {
        setPlayers: (player1, player2) => {
            curr_player = player1;
            players = [player1, player2];
            console.log(player1);
            console.log(player2);
            initTable();
        }
    } 
    
    return publicFunctions;
})()

const elementsAnimation = (() => {

    let startBtn = document.getElementById("start");
    let title = document.getElementById("title");
    let form = document.getElementById("form");
    let table = document.getElementById("table");
    let counter = document.getElementById("counter");
    let inputs = document.getElementsByClassName("validate");

    startBtn.addEventListener('click', () =>{
        if(inputs[0].value != "" && inputs[1].value != ""){
            
            player1 = player(inputs[0].value);
            player2 = player(inputs[1].value);
            gameBoard.setPlayers(player1, player2);
            
            title.style.transition = "bottom 0.5s ease-in-out 0.5s";
            title.style.bottom = "24vh";
            
            form.style.transition = "left 0.5s ease-in-out 0.5s, opacity 0.5s ease-in-out 0.5s";
            form.style.left = "80vmin";
            form.style.opacity = "0";
    

            table.style.transition = "right 0.55s ease-in-out 0.55s, opacity 0.55s ease-in-out 0.55s";
            table.style.right = "0";
            table.style.opacity = "1";
            table.style.zIndex = "1";

            counter.style.transition = "opacity 0.55s ease-in-out 0.55s";
            counter.style.opacity = "1";
            
            setTimeout(() => {
                form.style.display = "none";
                table.style.position = "relative";
            }, 500);        
        }else{
            alert("please insert player names");
        }
    })
})()
