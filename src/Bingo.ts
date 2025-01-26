import { Board } from "./Board";
import { Tile } from "./types";

export class Bingo {
    readonly size: number;
    readonly members_count: number;
    private boards: Board[];
    private canceled: Set<number>;
    private cancel_counts: number[];
    private is_gameover: boolean;
    private winner: number | null;

    constructor(size: number = 5, count: number = 2) {
        if(size < 2) {
            throw new Error("Bingo can not be played on board size less then 2")
        }
        if(count < 2 || count > size) {
            throw new Error("numbers of members can only be in the range 2 to size of bord")
            // because this dosen't make any sence to have too much players it will be completly unfair game
        }
        this.size = size;
        this.members_count = count;
        this.boards = [];
        for (let i = 0; i < count; i++) {
            this.boards[i] = new Board(size);
        }
        this.canceled = new Set<number>();
        this.cancel_counts = new Array(count).fill(0);
        this.is_gameover = false;
        this.winner = null;
    }

    public getTurn() : number {
        return this.canceled.size % this.members_count;
    }

    public getBoards() : number[][][] {
        const res: number[][][] = [];
        this.boards.forEach((board) => {
            res.push(board.getData())
        });
        return res;
    }

    public getMyBoard(ind: number) : number[][] {
        if(ind < 0 || ind >= this.members_count){
            throw new Error("invalid index")
        }
        return this.boards[ind].getData();
    }
    
    public getMyCancelCount(ind: number) : number {
        if(ind < 0 || ind >= this.members_count){
            throw new Error("invalid index")
        }
        return this.boards[ind].getCancelCount();
    }
    
    public getMyCanceledInfo(ind: number) : string[] {
        if(ind < 0 || ind >= this.members_count){
            throw new Error("invalid index")
        }
        return this.boards[ind].getCanceldInfo();
    }

    public getMyBoardInfo(ind: number) : Tile[][] {
        if(ind < 0 || ind > this.size) {
            throw new Error("Invalid index...")
        }
        return this.boards[ind].getBoardDetails();
    }

    public getCanceled() : number[] {
        return [...this.canceled];
    }
    public getCancelCounts() : number[] {
        return this.cancel_counts;
    }
    public getWinner() : number | null {
        return this.winner;
    }
    
    public cancelNumber(num: number, turn: number) {
        if(this.is_gameover){
            throw new Error("hey game is over, why don't you try a new game...")
        }
        if(turn != this.getTurn()){
            throw new Error("Its not your turn...")
        }
        if(num <= 0 || num > this.size * this.size){
            throw new Error("Invalid number, out of range")
        }
        if(this.canceled.has(num)){
            throw new Error("Number already canceled")
        }

        this.boards.forEach((board, i)=> {
            this.cancel_counts[i] = board.cancelNumber(num);
            this.canceled.add(num);
        })

        if(this.cancel_counts[turn] >= this.size){
            // you win the game 
            this.winner = turn;
            this.is_gameover = true;
        }
        this.cancel_counts.forEach((count, i) => {
            if(count >= this.size){
                // somone else win by your move : i is the winner 
                this.winner = i;
                this.is_gameover = true;
            }
        })


    }
    
   /**
    * README BEFOR USING THIS FUNCTION  
    * This function is for suppose you want the numbers of your choice like 
    * you have build your own way of random arangement (but honestly i don't remond you to do that it will simply sounds unfair)
    * another or the MAJOR REASON for the existance of this function is: suppose your server goes down and 
    * games are goin on and you have stored the game state in DB OR redis whatever now you want to reinitialize it 
    * then use this function  (or now you are the boss so do wahtever you feel good )
    * 
   */
    public customInitialize(newBoards: number[][][], newCanceles: number[]) {
        if(newBoards.length < 0 || newBoards.length > this.members_count){
            throw new Error("Invalid numbe of boards passed...")
        }
        if(newBoards[0].length != this.size){
            throw new Error("Invalid board size...")
        }
        const set = new Set<number>;
        newCanceles.forEach((cancel) => {
            if(cancel < 0 || cancel > this.size * this.size){
                throw new Error("Invalid number in cancels...")
            }
            if(set.has(cancel)){
                throw new Error("Duplicate cancel numbers...")
            }
            set.add(cancel)
        });

        this.canceled.clear()
        newCanceles.forEach((cancel) => {
            this.canceled.add(cancel)
        });

        
        this.boards.forEach((board, i) => {
            this.cancel_counts[i] = board.customInitialize(newBoards[i], newCanceles);
        })
    }
}