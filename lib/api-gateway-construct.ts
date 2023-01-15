import {Construct} from "constructs";
import {BasePathMapping, DomainName, RestApi} from "aws-cdk-lib/aws-apigateway";
import {DomainOptions} from "../types/options";

export class ApiGatewayConstruct extends Construct {
    private readonly _api: RestApi;

    constructor(scope: Construct, id: string, option: DomainOptions) {
        super(scope, id);

        this._api = new RestApi(this,
            'RestApi', {
                description: 'Sample API',
                restApiName: 'Sample API',
                disableExecuteApiEndpoint: true,
                deployOptions: {
                    stageName: `main`,
                },
            });

        let domainName = DomainName.fromDomainNameAttributes(this, 'APIDomainName', {
            domainName: option.domainName,
            domainNameAliasTarget: option.domainNameAliasTarget,
            domainNameAliasHostedZoneId: option.domainNameAliasHostedZoneId
        })

        new BasePathMapping(this, 'ApiBasePathMapping', {
            domainName: domainName,
            restApi: this._api,
            // the properties below are optional
            basePath: 'my-mapping',
            stage: this._api.deploymentStage,
        });
    }

    get api(): RestApi {
        return this._api;
    }
}
