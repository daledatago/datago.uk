# Enterprise deployment and security position

Status: proposed architecture for discussion. It is not a claim about features already implemented in the demonstrations.

## Recommendation: customer-environment first, interface flexible

DataGo should design and deliver the solution inside the buyer's approved environment, using the identity, data, integration and operational services the buyer selects. The first interface may be a customer-branded web application, an existing buyer portal or an approved enterprise assistant. All interfaces use the same permissions, data controls and audit record.

```text
Business user or CITB author
              |
     Buyer-selected experience
   Web app | existing portal | assistant
              |
       Buyer identity and policy
              |
       Governed solution services
   Workflow | data | evidence | audit
              |
          Model gateway
     /           |             \
 managed      private/local    no model
 inference     inference       required
```

The model provider is a replaceable component behind the application. The security boundary sits in the solution deployed in the buyer's environment, not inside a prompt or a portable skill. DataGo's role is to design, configure, integrate and support the solution under the buyer's access and operational model.

## Data classification before model selection

Model choice should follow the sensitivity of the task. It should not be a free toggle that an end user can change without policy checks.

| Data class | Examples | Initial model route |
| --- | --- | --- |
| Public or synthetic | Published HSE guidance, demonstration scenarios | Approved managed model may be suitable |
| Internal | Draft methods, ordinary working notes | Buyer-approved managed deployment with agreed region, logging and retention |
| Commercially confidential | SME costs, margins, supplier terms, customer retention, product plans | Private managed deployment or self-hosted open-weight model after a risk assessment |
| Restricted assessment content | Unreleased item banks, answer keys, test-development analysis | Dedicated buyer environment with tightly limited access; consider private or self-hosted inference |
| Personal or special-category data | Candidate records, employee data, identifiable customer information | Exclude from the first proof of concept; require a documented lawful purpose, DPIA and explicit security approval before any later use |

The application should block or redact data that is outside the approved class for the selected route. Logs, prompts, retrieved context and outputs inherit the highest sensitivity of their inputs.

## Model routes and sovereignty

“Not used for training” is necessary but not sufficient. Before approving a managed foundation-model service, confirm the exact product and deployment configuration, including:

- processing and storage geography;
- retention for prompts, files, embeddings, responses and abuse monitoring;
- human access and support access;
- subprocessors and cross-border transfers;
- contract terms covering model training and service improvement;
- encryption and customer-managed key options;
- deletion, backup and incident-response arrangements;
- whether global, data-zone or preview features change any of the above.

The service should support policy-controlled routes rather than depend on one provider:

1. **Managed enterprise model:** suitable where the buyer accepts the provider, contract, geography and retention. CITB's Microsoft environment makes a buyer-owned Microsoft Foundry deployment a route worth assessing, not a foregone conclusion.
2. **Private cloud or dedicated deployment:** suitable where stronger network, key, capacity or administrative isolation is required.
3. **Self-hosted open-weight model:** suitable where data must remain within a buyer-controlled environment and the model is capable enough for the task.
4. **No model route:** required where the data class or use case has not been approved. The workflow can continue with deterministic calculations or human processing.

Open-weight does not automatically mean secure. Self-hosting moves responsibility for model provenance, licence compliance, malicious artefacts, patching, inference infrastructure, access controls, monitoring and evaluation to DataGo or the buyer. It may be the right trade-off for sensitive workloads, but only when those operational controls are funded and tested.

## Circular commercial-value service

The likely journey is:

1. A business user follows a link from Zero Waste Scotland's Business Information Hub or a programme invitation.
2. The user signs in through the identity approach selected by Zero Waste Scotland and enters an isolated organisation workspace.
3. The business enters a small set of commercial assumptions manually. Later, approved connectors can bring in selected data.
4. The service calculates scenarios, shows the evidence and uncertainty behind them, and records who owns each assumption.
5. The business decides whether to revise, pilot or prepare an investment case.
6. Zero Waste Scotland sees consented, anonymised and aggregated patterns for programme learning. It does not automatically receive every business's raw commercial data.

The current public prototype should stay anonymous and use synthetic data. Authentication and real business data belong in a controlled proof of concept after the data-sharing and research questions are agreed.

## CITB assessment-authoring service

The likely journey is different:

1. Authorised CITB staff sign in, ideally through Microsoft Entra ID if that fits CITB's target architecture.
2. An administrator selects approved, versioned source material and an assessment specification.
3. The service creates structured draft items through an approved model endpoint.
4. Automated checks flag missing fields, unsupported claims, duplicate content, readability issues and source gaps.
5. Named construction and assessment specialists review, return or approve each item.
6. Approved content is exported or integrated into CITB's chosen question-bank and delivery systems.

The initial proof of concept need not process candidate records or learner personal data. Keeping the first scope to source documents, draft questions and reviewer decisions reduces risk and makes the quality claim easier to test.

Unreleased questions, answer keys and item-bank analytics are still sensitive even when they contain no personal data. Exposure could undermine assessment integrity and reveal valuable CITB intellectual property. They should be classified, access-controlled and kept out of ordinary consumer assistants.

## What an agent or skill may do

An optional skill can describe the supported tasks and call the governed API. For example, it could ask the user for assumptions, request a scenario calculation and explain the returned evidence. It should contain no customer data, credentials, hidden buyer material or enforcement logic.

An approved enterprise assistant could provide a conversational interface. Each call must use delegated identity, pass through the same authorisation checks and create the same audit record as the web application or existing portal. A buyer can then choose its preferred interface without changing the underlying controls.

Do not position a downloadable prompt pack or skill as the enterprise product. Prompts can guide behaviour, but they cannot enforce tenant separation, retention, access rights, deletion or auditability.

## Minimum enterprise controls

- **Organisation isolation:** every record belongs to a defined tenant and cannot be retrieved across tenants.
- **Identity and roles:** single sign-on where appropriate, multi-factor authentication and separate administrator, author, reviewer and read-only permissions.
- **Least privilege:** the model and connectors receive only the data needed for the current task.
- **Model gateway:** use buyer-approved models and regions, prevent provider training on customer inputs contractually, and retain the option to change provider.
- **Policy-controlled routing:** select the managed, private, self-hosted or no-model path from the tenant policy and data class. Do not let a prompt choose its own route.
- **Evidence boundaries:** distinguish source evidence, user assumptions, generated content and approved decisions.
- **Human approval:** high-impact content cannot move to an approved or published state without an authorised person.
- **Audit history:** record source version, model/configuration identifier, workflow version, edits, reviews, exports and access events.
- **Data lifecycle:** define collection, encryption, retention, export and deletion before accepting customer data.
- **Safe aggregation:** remove direct identifiers, apply minimum group thresholds and test re-identification risk before producing sponsor dashboards.
- **Application security:** secrets management, dependency and vulnerability management, monitoring, backups, incident response and independent testing appropriate to the delivery stage.
- **AI-specific controls:** test prompt injection, malicious files, unsupported citations, data leakage and unsafe tool use. Treat retrieved content as data, not instructions.
- **Sovereignty evidence:** retain the approved service configuration, contractual commitments, region, retention settings and subprocessor position for each model route.

## Sensible delivery stages

### Demonstration

- Synthetic or public data only.
- No login and no external system connections.
- Shows the decision journey and the proposed controls.

### Controlled proof of concept

- One buyer-controlled environment or isolated tenant.
- Named users and basic role separation.
- Approved source set or limited business dataset.
- One approved model route.
- Data-classification rules and an explicit list of prohibited inputs.
- Full decision and review audit trail.
- No autonomous publication or cross-tenant aggregation.

### Enterprise pilot

- Buyer identity integration and formal access model.
- Agreed hosting, data location, retention and support model.
- Security testing and documented operational controls.
- Limited production integrations.
- Consented aggregation for sponsor insight where required.

### Scaled service

- Multiple organisations with tested tenant isolation.
- Configurable policies and model options.
- Managed connectors, service monitoring and support.
- Approved assistant and API access where there is user demand.

## Differentiation to test

DataGo should test the position that the valuable product is a governed decision service, not an agent tied to one model vendor. The customer experience and any assistant share the same evidence, permission and audit layer. This could give buyers the convenience of conversational tools without asking them to trust security rules embedded in a prompt or accept a separate DataGo software estate.

No current brief requires white-labelling or prescribes a DataGo-hosted portal. The circular challenge says the solution is likely to be hosted on or linked from Zero Waste Scotland's Business Information Hub. CITB asks suppliers to explain integration with its Microsoft-based technology ecosystem, architecture, APIs, data management, resilience, support and exit. A buyer-controlled, customer-branded implementation is therefore a sensible design assumption to test, not a confirmed requirement.

Bridgly may eventually provide parts of the evidence, ownership, decision and handover layer. Treat that as a product hypothesis until the exact integration, permission and tenant-isolation behaviour is implemented and tested.

## Reference guidance

- UK National Cyber Security Centre, [Guidelines for secure AI system development](https://www.ncsc.gov.uk/collection/guidelines-secure-ai-system-development/guidelines/secure-development), including supply-chain controls and protection of models, data, prompts and logs.
- UK Government, [AI Playbook for the UK Government](https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government).
- Microsoft, [Data, privacy and security for models sold by Azure in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/openai/data-privacy), which must be checked against the exact deployment type and features proposed at the time of procurement.
