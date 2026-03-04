// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type TaskDocument = Task & Document;

// @Schema()
// export class Task {
//     @Prop({ required: true })
//     title: string;

//     @Prop()
//     description?: string;

//     @Prop({ default: false })
//     completed: boolean;

//     @Prop({ default: Date.now })
//     createdAt: Date;

//     // Add these fields for resume history
//     @Prop({ required: true })
//     userId: string;

//     @Prop()
//     resumeId?: string;

//     @Prop()
//     historyType?: string; // e.g., 'edit', 'view', 'submit'
// }

// export const TaskSchema = SchemaFactory.createForClass(Task);


// export interface Task {
//     id: string;
//     title: string;
//     description: string;
//     technologies: string[];
// }

