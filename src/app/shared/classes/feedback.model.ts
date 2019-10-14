import { IFeedback } from '../interfaces/feedback.interface';

export class Feedback implements IFeedback{
    constructor(
        public name: string,
        public email: string,
        public comment: string
    ){}
}