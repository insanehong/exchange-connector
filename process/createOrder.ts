import {ExchangeConnectorProcessBase} from "./base/processBase";
import {ICreateOrderMessage} from "../contracts/messages/createOrderMessage";
import {Message} from "kafka-node";

export class CreateOrder extends ExchangeConnectorProcessBase {
    onMessage(message: ICreateOrderMessage, kafkaMessage: Message) {
        const exchange = this.getExchange(message.exchange);

        if(!exchange) {
            return;
        }

        if(!exchange.has['createMarketOrder']) {
            return this.kafkaClient.sendError(`"createMarketOrder" is not supported on "${message.exchange}"`);
        }

        console.log(`Order to be created on "${message.exchange}" with params: ${JSON.stringify(message)}`);
        exchange.createOrder(message.symbol, message.type, message.side, message.amount, message.price, message.params)
            .then((data: any) => this.send(data), (error: any) => this.sendError(error));
    }
}