import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export type UserLogDocument = HydratedDocument<UserLog>;

@Schema({ collection: 'UserLog' })
export class UserLog {
    @Prop()
    username: string;

    @Prop()
    headers: Headers;

    @Prop({ type: Object })
    body: any;

    @Prop()
    url: string;

    @Prop({ default: now() })
    creationDate: Date;
}

export const UserLogSchema = SchemaFactory.createForClass(UserLog);
