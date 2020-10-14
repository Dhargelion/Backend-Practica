import {Document} from 'mongoose'

export interface user extends Document {
    readonly name: string;
    readonly age: number;
}