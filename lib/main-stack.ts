import {Construct} from 'constructs';
import * as cdk from 'aws-cdk-lib';
import {OneLambda} from "./one-lambda";
import {ApiGatewayConstruct} from "./api-gateway-construct";
import {DomainOptions} from "../types/options";
import {StackProps} from "aws-cdk-lib";

export class MainStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: StackProps, options: DomainOptions) {
        super(scope, id, props);

        const api = new ApiGatewayConstruct(
            this,
            'ApiGateway',
            options)

        new OneLambda(this, 'OneLambda', api.api);
    }
}
