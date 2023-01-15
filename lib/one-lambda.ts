import {Construct} from "constructs";
import {GoFunction} from "@aws-cdk/aws-lambda-go-alpha";
import {Duration} from "aws-cdk-lib";
import * as path from "path";
import {LambdaIntegration, Resource, RestApi} from "aws-cdk-lib/aws-apigateway";

export class OneLambda extends Construct {
    private readonly _func: GoFunction;

    constructor(scope: Construct, id: string, api: RestApi) {
        super(scope, id);

        this._func = new GoFunction(this, `OneLambda`, {
            entry: path.join(__dirname, `../src`),
            functionName: `sample-func`,
            timeout: Duration.seconds(30)
        });

        let resource = new Resource(this, 'OneResource', {
            parent: api.root,
            pathPart: "one"
        });

        resource
            .addMethod('GET', new LambdaIntegration(
                this._func, {
                    proxy: true
                }));

    }


    get function(): GoFunction {
        return this._func
    }
}
