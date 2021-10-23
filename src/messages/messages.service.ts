import {Injectable} from '@nestjs/common';
import {MessagesRepository} from "./messages.repository";

@Injectable()
export class MessagesService {
    messagesRepo: MessagesRepository;

    constructor() {
        // don't do this
        this.messagesRepo = new MessagesRepository();
    }

    findOne(id: string) {
        return this.messagesRepo.findOne(id)
    }
    findAll() {
        return this.messagesRepo.findAll()
    }
    create(content: string) {
        return this.messagesRepo.create(content)
    }
}
