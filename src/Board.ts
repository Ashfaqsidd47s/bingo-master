import { Tile } from "./types";

export class Board {
    readonly size: number;
    private data: number[][];
    private map: Map<number, [row:number, col: number]>;
    private canceledRowsCount: number[];
    private canceledColsCount: number[];
    private canceledDignlsCount: number[];
    private cancel_count: number;
    is_canceled: boolean[][];

    constructor(size: number) {
        if (size < 2) {
            throw new Error("Board size must be greater then 1");
        }
        this.size = size;
        this.data = Board.create(size);
        this.is_canceled = []
        for (let i = 0; i < size; i++) {
            this.is_canceled[i] = []
            for (let j = 0; j < size; j++) {
               this.is_canceled[i][j] = false;
            }
        }
        this.cancel_count = 0;
        this.map = new Map();
        this.data.forEach((row, i) => {
            row.forEach((item, j) => {
                this.map.set(item, [i, j]);
            })
        });
        this.canceledRowsCount = new Array(size).fill(0);
        this.canceledColsCount = new Array(size).fill(0);
        this.canceledDignlsCount = new Array(2).fill(0);
    
    }

    private static create(size: number) : number[][] {
        // genrate size*size numbers from 1 to size*size
        let numbers: number[] = [];
        for(let i = 1; i <= size * size ; i++){
            numbers[i - 1] = i;
        }
        // Arraging them in random order 
        for(let i = 1; i < size * size; i++) {
            const randomIdx = Math.floor(Math.random() * (size * size));
            const temp = numbers[i];
            numbers[i] = numbers[randomIdx];
            numbers[randomIdx] = temp;
        }
        
        const res:number[][] = [];
        for(let i = 0; i < size; i++) {
            res.push(numbers.slice(i * size, (i + 1) * size));
        }

        return res;
    }

    public getData() : number[][] {
        return this.data;
    }
    public getCancelCount(): number {
        return this.cancel_count;
    }

    public getCanceldInfo(): string[] {
        const res: string[] = [];
        this.canceledRowsCount.forEach((count, i) => {
            if(count == this.size) {
                res.push("R_" + String(i));
            }
        });
        this.canceledColsCount.forEach((count, i) => {
            if(count == this.size) {
                res.push("C_" + String(i));
            }
        });
        this.canceledDignlsCount.forEach((count, i) => {
            if(count == this.size) {
                res.push("D_" + String(i));
            }
        });
        return res;
    }

    public cancelNumber(num: number): number {
        // the cheks are alredy done in Board class so it dosn't make any sence to chek them again or maybe i am wrong
        

        const value = this.map.get(num);
        if(value) {
            const  [row, col] = value;
            this.is_canceled[row][col] = true;
            this.canceledRowsCount[row]++;
            this.canceledColsCount[col]++;
            if(this.canceledRowsCount[row] === this.size) this.cancel_count++;
            if(this.canceledColsCount[col] === this.size) this.cancel_count++;
            if(row === col){
                this.canceledDignlsCount[0]++;
                if(this.canceledDignlsCount[0] === this.size) this.cancel_count++;
            }
            if((row + col) === (this.size - 1)){
                this.canceledDignlsCount[1]++;
                if(this.canceledDignlsCount[1] === this.size) this.cancel_count++;
            }
        }

        return this.cancel_count;
    }

    public customInitialize(newBoard: number[][], newCanceles: number[]) : number {
        this.data = newBoard;
        newBoard.forEach((row, i) => {
            row.forEach((item, j) => {
                this.map.set(item, [i, j]);
            });
        });
        
        for (let i = 0; i < this.size; i++) {
            this.is_canceled[i] = []
            for (let j = 0; j < this.size; j++) {
               this.is_canceled[i][j] = false;
            }
        }
        this.canceledRowsCount.fill(0)
        this.canceledColsCount.fill(0)
        this.canceledDignlsCount.fill(0)
        this.cancel_count = 0;
        newCanceles.forEach((cancel) => {
            this.cancelNumber(cancel)
        })

        return this.cancel_count;
    }

    // create a function which will give detailed info about board
    public getBoardDetails() : Tile[][] {
        const res: Tile[][] = []
        this.data.forEach((row, i) => {
            res[i] = []
            row.forEach((item, j) => {
                res[i][j] = {
                    value: item,
                    isCanceled: this.is_canceled[i][j]
                }
            });
        });
        return res;
    }
}
