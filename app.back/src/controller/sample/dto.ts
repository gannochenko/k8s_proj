import { DTO, Attribute } from '@bucket-of-bolts/express-mvc';

@DTO()
export class SamplePutDTO {
    @Attribute({ type: 'string', required: true })
    public title: string | undefined;
}
