import type { DomainId, DomainInfo, Question } from './quiz-types'

export const DOMAINS: Record<DomainId, DomainInfo> = {
  'cloud-concepts': {
    id: 'cloud-concepts',
    name: 'Describe cloud concepts',
    shortName: 'Cloud Concepts',
    weighting: '25–30%',
    questionsPerQuiz: 3,
  },
  'architecture-services': {
    id: 'architecture-services',
    name: 'Describe Azure architecture and services',
    shortName: 'Azure Architecture and Services',
    weighting: '35–40%',
    questionsPerQuiz: 4,
  },
  'management-governance': {
    id: 'management-governance',
    name: 'Describe Azure management and governance',
    shortName: 'Azure Management and Governance',
    weighting: '30–35%',
    questionsPerQuiz: 3,
  },
}

export const DOMAIN_ORDER: DomainId[] = [
  'cloud-concepts',
  'architecture-services',
  'management-governance',
]

const LEARN = {
  cloudCompute:
    'https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/',
  cloudBenefits:
    'https://learn.microsoft.com/en-us/training/modules/describe-benefits-use-cloud-services/',
  serviceTypes:
    'https://learn.microsoft.com/en-us/training/modules/describe-cloud-service-types/',
  coreArchitecture:
    'https://learn.microsoft.com/en-us/training/modules/describe-core-architectural-components-of-azure/',
  computeNetworking:
    'https://learn.microsoft.com/en-us/training/modules/describe-azure-compute-networking-services/',
  storage:
    'https://learn.microsoft.com/en-us/training/modules/describe-azure-storage-services/',
  identitySecurity:
    'https://learn.microsoft.com/en-us/training/modules/describe-azure-identity-access-security/',
  costManagement:
    'https://learn.microsoft.com/en-us/training/modules/describe-cost-management-azure/',
  governance:
    'https://learn.microsoft.com/en-us/training/modules/describe-features-tools-azure-for-governance-compliance/',
  deployTools:
    'https://learn.microsoft.com/en-us/training/modules/describe-features-tools-manage-deploy-azure-resources/',
  monitoring:
    'https://learn.microsoft.com/en-us/training/modules/describe-monitoring-tools-azure/',
} as const

const CC = DOMAINS['cloud-concepts']
const AS = DOMAINS['architecture-services']
const MG = DOMAINS['management-governance']

export const QUESTIONS: Question[] = [
  // ───────────── Domain 1: Cloud concepts (8) ─────────────
  {
    id: 'cc-01',
    domainId: CC.id,
    domainName: CC.shortName,
    topic: 'Cloud computing fundamentals',
    difficulty: 'beginner',
    question: 'Which statement best describes cloud computing?',
    options: [
      { id: 'a', text: 'Buying and installing your own servers in an office server room' },
      { id: 'b', text: 'Delivering computing services such as servers, storage and databases over the internet' },
      { id: 'c', text: 'Installing software on a single laptop so it works without a network' },
      { id: 'd', text: 'Connecting office computers with cables so they can share a printer' },
    ],
    correctAnswerId: 'b',
    explanation:
      'Cloud computing is the delivery of computing services — servers, storage, databases, networking and software — over the internet. You rent what you need from a provider instead of owning and maintaining the hardware yourself.',
    optionExplanations: {
      a: 'Owning and running your own servers is on-premises computing, which is what the cloud lets you avoid.',
      b: 'Correct. The key idea is renting computing services over the internet rather than owning the hardware.',
      c: 'Software installed on one laptop is local computing. It does not involve a cloud provider at all.',
      d: 'This describes a local area network (LAN). Networks are useful, but sharing a printer is not cloud computing.',
    },
    learningTip:
      'Think "rent, don\u2019t own": cloud computing means renting IT resources over the internet.',
    learnMoreUrl: LEARN.cloudCompute,
  },
  {
    id: 'cc-02',
    domainId: CC.id,
    domainName: CC.shortName,
    topic: 'Cloud deployment models',
    difficulty: 'beginner',
    question:
      'A hospital keeps patient records on servers in its own building but runs its public appointment-booking website in Azure. The two environments are connected. Which cloud model is this?',
    options: [
      { id: 'a', text: 'Public cloud' },
      { id: 'b', text: 'Private cloud' },
      { id: 'c', text: 'Hybrid cloud' },
      { id: 'd', text: 'Serverless cloud' },
    ],
    correctAnswerId: 'c',
    explanation:
      'A hybrid cloud combines on-premises (or private cloud) infrastructure with public cloud services, connected so they can work together. The hospital uses both its own servers and Azure.',
    optionExplanations: {
      a: 'A public cloud would mean everything runs on the provider\u2019s infrastructure. Here, the patient records stay on the hospital\u2019s own servers.',
      b: 'A private cloud is used by a single organisation only. The booking website runs in Azure\u2019s public cloud, so this is not purely private.',
      c: 'Correct. Mixing on-premises infrastructure with public cloud, connected together, is a hybrid cloud.',
      d: 'Serverless is a way of running code without managing servers. It is a compute model, not a cloud deployment model.',
    },
    learningTip:
      'Hybrid = "a bit of both": your own infrastructure plus the public cloud, working together.',
    learnMoreUrl: LEARN.cloudCompute,
  },
  {
    id: 'cc-03',
    domainId: CC.id,
    domainName: CC.shortName,
    topic: 'Shared responsibility model',
    difficulty: 'intermediate',
    question:
      'Under the shared responsibility model, which responsibility ALWAYS remains with the customer, whether they use IaaS, PaaS or SaaS?',
    options: [
      { id: 'a', text: 'Physical security of the datacenter' },
      { id: 'b', text: 'Patching the operating system' },
      { id: 'c', text: 'Maintaining the physical network hardware' },
      { id: 'd', text: 'The information and data they store in the cloud' },
    ],
    correctAnswerId: 'd',
    explanation:
      'In every cloud service type, the customer is always responsible for their information and data, the devices that access it, and their accounts and identities. The provider is always responsible for the physical datacenter, network and hosts.',
    optionExplanations: {
      a: 'Physical datacenter security is always the cloud provider\u2019s responsibility, never the customer\u2019s.',
      b: 'Operating system patching is the customer\u2019s job in IaaS, but the provider handles it in PaaS and SaaS. So it is not "always" the customer.',
      c: 'Physical network hardware lives inside the provider\u2019s datacenter, so the provider always maintains it.',
      d: 'Correct. Your data is always yours to protect, no matter which cloud service type you use.',
    },
    learningTip:
      'Remember "DIA" is always yours: Data, Identities (accounts) and Access devices.',
    learnMoreUrl: LEARN.cloudCompute,
  },
  {
    id: 'cc-04',
    domainId: CC.id,
    domainName: CC.shortName,
    topic: 'Consumption-based pricing',
    difficulty: 'beginner',
    question:
      'A small business moves to the cloud using a consumption-based model. What is the main financial benefit?',
    options: [
      { id: 'a', text: 'They pay only for the resources they use, with no large upfront hardware cost' },
      { id: 'b', text: 'They pay the same fixed fee every month regardless of usage' },
      { id: 'c', text: 'They must buy servers upfront but get cheaper electricity' },
      { id: 'd', text: 'All cloud services become free after the first year' },
    ],
    correctAnswerId: 'a',
    explanation:
      'With consumption-based pricing you pay only for what you use. There is no need to buy hardware upfront, which shifts spending from capital expenditure (CapEx) to operational expenditure (OpEx).',
    optionExplanations: {
      a: 'Correct. Pay-as-you-go means no big upfront purchase and costs that follow actual usage.',
      b: 'A fixed fee regardless of usage is the opposite of consumption-based pricing.',
      c: 'Buying servers upfront is a capital expense — exactly what consumption-based pricing helps you avoid.',
      d: 'Cloud services are not free after a year. Some free tiers and credits exist, but usage is still billed.',
    },
    learningTip:
      'Consumption-based pricing works like a prepaid electricity meter: you pay for what you actually use.',
    learnMoreUrl: LEARN.cloudCompute,
  },
  {
    id: 'cc-05',
    domainId: CC.id,
    domainName: CC.shortName,
    topic: 'High availability',
    difficulty: 'beginner',
    question:
      'An online shop needs its website to stay accessible to customers even when some underlying components fail. Which cloud benefit describes this?',
    options: [
      { id: 'a', text: 'Predictability' },
      { id: 'b', text: 'Governance' },
      { id: 'c', text: 'Manageability' },
      { id: 'd', text: 'High availability' },
    ],
    correctAnswerId: 'd',
    explanation:
      'High availability means a service stays up and accessible with minimal downtime, even when individual components fail. Azure supports this through redundancy and service-level agreements (SLAs).',
    optionExplanations: {
      a: 'Predictability is about being confident in performance and cost. It is related, but it is not about staying online during failures.',
      b: 'Governance is about setting rules and standards for how resources are used, not about uptime.',
      c: 'Manageability is about how easily you can manage and monitor resources, not about surviving failures.',
      d: 'Correct. Staying accessible despite component failures is high availability.',
    },
    learningTip:
      'High availability = "always open for business", even when something breaks behind the scenes.',
    learnMoreUrl: LEARN.cloudBenefits,
  },
  {
    id: 'cc-06',
    domainId: CC.id,
    domainName: CC.shortName,
    topic: 'Scalability and elasticity',
    difficulty: 'intermediate',
    question:
      'A mobile money app sees huge traffic at the end of each month. The cloud automatically adds resources during the spike and removes them afterwards. Which concept is this?',
    options: [
      { id: 'a', text: 'Reliability' },
      { id: 'b', text: 'Elasticity' },
      { id: 'c', text: 'Security' },
      { id: 'd', text: 'Predictability' },
    ],
    correctAnswerId: 'b',
    explanation:
      'Elasticity is the ability to automatically add or remove resources as demand changes. It is a form of scalability that happens on its own, so you pay for extra capacity only while you need it.',
    optionExplanations: {
      a: 'Reliability is about recovering from failures and continuing to work. It is not about matching resources to demand.',
      b: 'Correct. Automatically growing and shrinking with demand is elasticity.',
      c: 'Security is about protecting data and resources, not adjusting capacity.',
      d: 'Predictability is about consistent performance and cost forecasting, not automatic resource changes.',
    },
    learningTip:
      'Elastic = like a rubber band: it stretches when demand rises and snaps back when demand falls.',
    learnMoreUrl: LEARN.cloudBenefits,
  },
  {
    id: 'cc-07',
    domainId: CC.id,
    domainName: CC.shortName,
    topic: 'IaaS, PaaS and SaaS',
    difficulty: 'beginner',
    question:
      'A school\u2019s developers want to deploy their own web application without managing the operating system or underlying servers. Which cloud service type fits best?',
    options: [
      { id: 'a', text: 'Infrastructure as a Service (IaaS)' },
      { id: 'b', text: 'Software as a Service (SaaS)' },
      { id: 'c', text: 'Platform as a Service (PaaS)' },
      { id: 'd', text: 'On-premises hosting' },
    ],
    correctAnswerId: 'c',
    explanation:
      'PaaS provides a ready-made platform for building and running your own applications. The provider manages the servers and operating system; you focus on your code and data.',
    optionExplanations: {
      a: 'With IaaS you rent virtual machines but still manage the operating system yourself — which the school wants to avoid.',
      b: 'SaaS is finished software you simply use (like email). The developers want to deploy their own app, not use someone else\u2019s.',
      c: 'Correct. PaaS lets you deploy your own app while the provider handles the platform underneath.',
      d: 'On-premises hosting means managing everything yourself, including servers and the operating system.',
    },
    learningTip:
      'IaaS = you rent the kitchen. PaaS = you bring the recipe, the kitchen is managed. SaaS = you just order the meal.',
    learnMoreUrl: LEARN.serviceTypes,
  },
  {
    id: 'cc-08',
    domainId: CC.id,
    domainName: CC.shortName,
    topic: 'Serverless computing',
    difficulty: 'intermediate',
    question: 'Which statement best describes serverless computing?',
    options: [
      { id: 'a', text: 'Applications run without any physical servers existing anywhere' },
      { id: 'b', text: 'You must provision and patch virtual machines before running code' },
      { id: 'c', text: 'It is a storage service used only for backing up files' },
      { id: 'd', text: 'You run code without managing servers, and it scales automatically with demand' },
    ],
    correctAnswerId: 'd',
    explanation:
      'With serverless computing the cloud provider manages the servers for you. Your code runs in response to events, scales automatically, and you are typically billed only while it runs. Azure Functions is an example.',
    optionExplanations: {
      a: 'Servers still exist — the provider just manages them so you do not have to. "Serverless" means "servers are not your concern".',
      b: 'Provisioning and patching VMs is IaaS work. Serverless removes that responsibility.',
      c: 'Serverless is a way to run code, not a file backup service.',
      d: 'Correct. No server management, automatic scaling and event-driven execution define serverless.',
    },
    learningTip:
      '"Serverless" doesn\u2019t mean no servers — it means no servers for YOU to manage.',
    learnMoreUrl: LEARN.serviceTypes,
  },

  // ───────────── Domain 2: Azure architecture and services (11) ─────────────
  {
    id: 'as-01',
    domainId: AS.id,
    domainName: AS.shortName,
    topic: 'Azure regions',
    difficulty: 'beginner',
    question: 'What is an Azure region?',
    options: [
      { id: 'a', text: 'A geographical area containing one or more datacenters connected by a low-latency network' },
      { id: 'b', text: 'A single server rack inside one datacenter' },
      { id: 'c', text: 'A logical folder for organising related Azure resources' },
      { id: 'd', text: 'A billing account that pays for Azure services' },
    ],
    correctAnswerId: 'a',
    explanation:
      'An Azure region is a geographical area on the planet that contains at least one, and often several, datacenters connected through a low-latency network. You choose a region when you deploy most resources.',
    optionExplanations: {
      a: 'Correct. A region is a geographic area with one or more nearby, well-connected datacenters.',
      b: 'A region is much larger than a server rack — it can contain multiple entire datacenters.',
      c: 'A logical folder for related resources is a resource group, not a region.',
      d: 'Billing is handled by subscriptions and billing accounts, not regions.',
    },
    learningTip:
      'Choosing a region close to your users (for example, South Africa North for users in southern Africa) usually means lower latency.',
    learnMoreUrl: LEARN.coreArchitecture,
  },
  {
    id: 'as-02',
    domainId: AS.id,
    domainName: AS.shortName,
    topic: 'Availability zones',
    difficulty: 'intermediate',
    question:
      'Which Azure feature helps protect an application from the failure of an entire datacenter within a region?',
    options: [
      { id: 'a', text: 'Resource groups' },
      { id: 'b', text: 'Resource tags' },
      { id: 'c', text: 'Availability zones' },
      { id: 'd', text: 'Management groups' },
    ],
    correctAnswerId: 'c',
    explanation:
      'Availability zones are physically separate datacenter locations within an Azure region, each with independent power, cooling and networking. Spreading resources across zones keeps your app running if one datacenter fails.',
    optionExplanations: {
      a: 'Resource groups organise resources logically. They do not change where resources physically run.',
      b: 'Tags are labels for organising and reporting. They provide no protection against failures.',
      c: 'Correct. Zones are separate physical locations in a region, so one failing does not take down the others.',
      d: 'Management groups organise subscriptions for governance. They do not provide physical redundancy.',
    },
    learningTip:
      'Availability zones = "don\u2019t keep all your eggs in one building" within the same region.',
    learnMoreUrl: LEARN.coreArchitecture,
  },
  {
    id: 'as-03',
    domainId: AS.id,
    domainName: AS.shortName,
    topic: 'Resource groups',
    difficulty: 'beginner',
    question: 'Which statement about Azure resource groups is correct?',
    options: [
      { id: 'a', text: 'A resource can belong to several resource groups at the same time' },
      { id: 'b', text: 'Resource groups can be nested inside other resource groups' },
      { id: 'c', text: 'Deleting a resource group keeps all the resources inside it' },
      { id: 'd', text: 'Each resource can belong to only one resource group at a time' },
    ],
    correctAnswerId: 'd',
    explanation:
      'A resource group is a logical container for Azure resources. Every resource must be in exactly one resource group. Resource groups cannot be nested, and deleting a resource group deletes everything inside it.',
    optionExplanations: {
      a: 'A resource lives in exactly one resource group. You can move it, but it cannot be in two at once.',
      b: 'Resource groups cannot be nested. Nesting is possible with management groups, not resource groups.',
      c: 'Deleting a resource group deletes all resources inside it — a common and costly mistake.',
      d: 'Correct. One resource, one resource group at a time.',
    },
    learningTip:
      'Group resources that share a lifecycle — when the project ends, deleting the group cleans everything up.',
    learnMoreUrl: LEARN.coreArchitecture,
  },
  {
    id: 'as-04',
    domainId: AS.id,
    domainName: AS.shortName,
    topic: 'Subscriptions and management groups',
    difficulty: 'intermediate',
    question:
      'A company has several Azure subscriptions and wants to apply the same governance policies to all of them at once. What should it use?',
    options: [
      { id: 'a', text: 'Management groups' },
      { id: 'b', text: 'Resource groups' },
      { id: 'c', text: 'Availability zones' },
      { id: 'd', text: 'Resource tags' },
    ],
    correctAnswerId: 'a',
    explanation:
      'Management groups sit above subscriptions in the Azure hierarchy. Policies and access assigned to a management group are inherited by every subscription inside it.',
    optionExplanations: {
      a: 'Correct. Management groups let you govern many subscriptions together through inheritance.',
      b: 'Resource groups live inside a subscription, so they cannot span several subscriptions.',
      c: 'Availability zones are about physical resilience, not governance.',
      d: 'Tags label resources for organisation; they do not apply policies across subscriptions.',
    },
    learningTip:
      'Hierarchy from top to bottom: Management groups → Subscriptions → Resource groups → Resources.',
    learnMoreUrl: LEARN.coreArchitecture,
  },
  {
    id: 'as-05',
    domainId: AS.id,
    domainName: AS.shortName,
    topic: 'Azure Virtual Machines',
    difficulty: 'beginner',
    question:
      'A bank needs to run legacy software that requires full control over the operating system and custom configuration. Which Azure service is most suitable?',
    options: [
      { id: 'a', text: 'Azure Functions' },
      { id: 'b', text: 'Azure Virtual Machines' },
      { id: 'c', text: 'Azure App Service' },
      { id: 'd', text: 'Azure Logic Apps' },
    ],
    correctAnswerId: 'b',
    explanation:
      'Azure Virtual Machines are an IaaS offering that give you full control over the operating system and installed software. They are ideal for legacy or custom workloads that need specific OS configuration.',
    optionExplanations: {
      a: 'Azure Functions is serverless — you do not control the operating system at all.',
      b: 'Correct. VMs give you full OS-level control, which legacy software often requires.',
      c: 'App Service is PaaS. It manages the OS for you, so you cannot fully customise it.',
      d: 'Logic Apps is for automating workflows between services, not for running custom OS-level software.',
    },
    learningTip:
      'Need full control of the operating system? Think Virtual Machines (IaaS).',
    learnMoreUrl: LEARN.computeNetworking,
  },
  {
    id: 'as-06',
    domainId: AS.id,
    domainName: AS.shortName,
    topic: 'Azure App Service',
    difficulty: 'beginner',
    question:
      'A startup wants to host its web app and REST API without managing servers, while still getting features like automatic scaling. Which service fits best?',
    options: [
      { id: 'a', text: 'Azure Blob Storage' },
      { id: 'b', text: 'Azure VPN Gateway' },
      { id: 'c', text: 'Azure Virtual Machines' },
      { id: 'd', text: 'Azure App Service' },
    ],
    correctAnswerId: 'd',
    explanation:
      'Azure App Service is a PaaS offering for hosting web apps, REST APIs and mobile back ends. Azure manages the infrastructure, and it supports features like auto-scaling and deployment slots.',
    optionExplanations: {
      a: 'Blob Storage stores files and unstructured data. It is not designed to run application code.',
      b: 'VPN Gateway connects networks securely. It does not host applications.',
      c: 'VMs can host web apps, but you would have to manage the servers yourself — the startup wants to avoid that.',
      d: 'Correct. App Service hosts web apps and APIs with the infrastructure managed for you.',
    },
    learningTip:
      'Web app or API + "I don\u2019t want to manage servers" = Azure App Service.',
    learnMoreUrl: LEARN.computeNetworking,
  },
  {
    id: 'as-07',
    domainId: AS.id,
    domainName: AS.shortName,
    topic: 'Azure Storage',
    difficulty: 'beginner',
    question:
      'An online retailer needs to store millions of product photos and videos. Which Azure storage service is designed for large amounts of unstructured data like this?',
    options: [
      { id: 'a', text: 'Azure Queue Storage' },
      { id: 'b', text: 'Azure Blob Storage' },
      { id: 'c', text: 'Azure Table Storage' },
      { id: 'd', text: 'Azure Disk Storage' },
    ],
    correctAnswerId: 'b',
    explanation:
      'Azure Blob Storage is object storage optimised for massive amounts of unstructured data such as images, videos, documents and backups. Files can be accessed over HTTP or HTTPS from anywhere.',
    optionExplanations: {
      a: 'Queue Storage holds messages passed between application components, not media files.',
      b: 'Correct. Blob Storage is built for large volumes of unstructured data like photos and videos.',
      c: 'Table Storage holds structured NoSQL data (rows of key-value properties), not media files.',
      d: 'Disk Storage provides disks attached to virtual machines, not a scalable store for millions of media files.',
    },
    learningTip:
      'BLOB = Binary Large OBject. Photos, videos and documents are classic "blobs".',
    learnMoreUrl: LEARN.storage,
  },
  {
    id: 'as-08',
    domainId: AS.id,
    domainName: AS.shortName,
    topic: 'Azure networking',
    difficulty: 'intermediate',
    question:
      'A company wants a private, dedicated connection from its on-premises network to Azure that does NOT travel over the public internet. Which service should it use?',
    options: [
      { id: 'a', text: 'Azure ExpressRoute' },
      { id: 'b', text: 'Azure VPN Gateway' },
      { id: 'c', text: 'Azure DNS' },
      { id: 'd', text: 'Virtual network peering' },
    ],
    correctAnswerId: 'a',
    explanation:
      'Azure ExpressRoute provides a private connection between on-premises infrastructure and Azure through a connectivity provider. Traffic does not go over the public internet, offering more reliability and consistent latency.',
    optionExplanations: {
      a: 'Correct. ExpressRoute is a private, dedicated connection that bypasses the public internet.',
      b: 'VPN Gateway creates an encrypted tunnel, but that tunnel still travels over the public internet.',
      c: 'Azure DNS hosts domain names. It does not connect networks.',
      d: 'Virtual network peering connects Azure virtual networks to each other, not on-premises networks to Azure.',
    },
    learningTip:
      'VPN = secure tunnel over the internet. ExpressRoute = private road that avoids the internet.',
    learnMoreUrl: LEARN.computeNetworking,
  },
  {
    id: 'as-09',
    domainId: AS.id,
    domainName: AS.shortName,
    topic: 'Microsoft Entra ID',
    difficulty: 'beginner',
    question:
      'Which Microsoft service provides cloud-based identity and access management, such as signing users in and enabling multifactor authentication?',
    options: [
      { id: 'a', text: 'Azure Policy' },
      { id: 'b', text: 'Azure Key Vault' },
      { id: 'c', text: 'Microsoft Entra ID' },
      { id: 'd', text: 'Microsoft Defender for Cloud' },
    ],
    correctAnswerId: 'c',
    explanation:
      'Microsoft Entra ID (formerly Azure Active Directory) is Microsoft\u2019s cloud-based identity and access management service. It handles authentication, single sign-on, multifactor authentication and more.',
    optionExplanations: {
      a: 'Azure Policy enforces rules on resources. It does not sign users in.',
      b: 'Key Vault securely stores secrets, keys and certificates — not user identities.',
      c: 'Correct. Entra ID is the identity service that verifies who users are.',
      d: 'Defender for Cloud monitors and improves security posture; it is not the identity provider.',
    },
    learningTip:
      'Entra ID answers "WHO are you?" — it is the front door for identities in Azure.',
    learnMoreUrl: LEARN.identitySecurity,
  },
  {
    id: 'as-10',
    domainId: AS.id,
    domainName: AS.shortName,
    topic: 'Azure role-based access control (RBAC)',
    difficulty: 'intermediate',
    question:
      'A developer should be able to manage virtual machines in ONE resource group only. Following the principle of least privilege, what should you do?',
    options: [
      { id: 'a', text: 'Make the developer an Owner of the whole subscription' },
      { id: 'b', text: 'Assign an appropriate role using Azure RBAC, scoped to that resource group' },
      { id: 'c', text: 'Apply a resource lock to the resource group' },
      { id: 'd', text: 'Add a tag with the developer\u2019s name to each VM' },
    ],
    correctAnswerId: 'b',
    explanation:
      'Azure role-based access control (RBAC) assigns roles to users at a specific scope — management group, subscription, resource group or resource. Scoping the role to one resource group grants only the access needed.',
    optionExplanations: {
      a: 'Subscription Owner gives far more access than needed, breaking the principle of least privilege.',
      b: 'Correct. An RBAC role scoped to the resource group grants exactly the access required.',
      c: 'Resource locks prevent deletion or changes. They do not grant anyone permissions.',
      d: 'Tags are labels for organisation and cost tracking. They do not control access.',
    },
    learningTip:
      'RBAC = Who + What role + Where (scope). Give the smallest role at the narrowest scope.',
    learnMoreUrl: LEARN.identitySecurity,
  },
  {
    id: 'as-11',
    domainId: AS.id,
    domainName: AS.shortName,
    topic: 'Azure security fundamentals',
    difficulty: 'intermediate',
    question:
      'Which security model assumes a breach could happen and therefore verifies every access request explicitly, even from inside the network?',
    options: [
      { id: 'a', text: 'Perimeter-only security' },
      { id: 'b', text: 'Shared responsibility model' },
      { id: 'c', text: 'Defense in depth' },
      { id: 'd', text: 'Zero Trust' },
    ],
    correctAnswerId: 'd',
    explanation:
      'Zero Trust is based on "never trust, always verify". It assumes breach, verifies explicitly and uses least-privilege access, rather than trusting anything just because it is inside the corporate network.',
    optionExplanations: {
      a: 'Perimeter-only security trusts everything inside the network — the exact assumption Zero Trust rejects.',
      b: 'The shared responsibility model splits duties between you and the cloud provider. It is not a model for verifying requests.',
      c: 'Defense in depth uses multiple layers of protection. It complements Zero Trust, but "verify every request, assume breach" is Zero Trust specifically.',
      d: 'Correct. Zero Trust means never trust, always verify — and assume breach.',
    },
    learningTip:
      'Zero Trust = "never trust, always verify", like a security guard who checks your badge at every door.',
    learnMoreUrl: LEARN.identitySecurity,
  },

  // ───────────── Domain 3: Azure management and governance (11) ─────────────
  {
    id: 'mg-01',
    domainId: MG.id,
    domainName: MG.shortName,
    topic: 'Cost management',
    difficulty: 'beginner',
    question:
      'Which tool lets you analyse your current Azure spending and set budgets that alert you when costs approach a limit?',
    options: [
      { id: 'a', text: 'Azure pricing calculator' },
      { id: 'b', text: 'Microsoft Cost Management' },
      { id: 'c', text: 'Azure Monitor' },
      { id: 'd', text: 'Azure Resource Manager' },
    ],
    correctAnswerId: 'b',
    explanation:
      'Microsoft Cost Management helps you track and analyse actual Azure spending, create budgets and receive alerts when spending reaches thresholds.',
    optionExplanations: {
      a: 'The pricing calculator estimates costs BEFORE you deploy. It does not track real spending or set budgets.',
      b: 'Correct. Cost Management tracks actual costs and lets you set budgets with alerts.',
      c: 'Azure Monitor tracks performance metrics and logs, not spending budgets.',
      d: 'Resource Manager deploys and manages resources; it is not a spending analysis tool.',
    },
    learningTip:
      'Pricing calculator = BEFORE you spend. Cost Management = AFTER you spend (track, budget, alert).',
    learnMoreUrl: LEARN.costManagement,
  },
  {
    id: 'mg-02',
    domainId: MG.id,
    domainName: MG.shortName,
    topic: 'Azure pricing calculator',
    difficulty: 'beginner',
    question:
      'Before moving to Azure, a small online retailer wants to estimate the monthly cost of the virtual machines and storage it plans to use. Which tool should it use?',
    options: [
      { id: 'a', text: 'Azure Service Health' },
      { id: 'b', text: 'Azure Policy' },
      { id: 'c', text: 'Azure pricing calculator' },
      { id: 'd', text: 'Microsoft Purview' },
    ],
    correctAnswerId: 'c',
    explanation:
      'The Azure pricing calculator lets you configure the services you plan to use and see an estimated cost before you deploy anything.',
    optionExplanations: {
      a: 'Service Health tells you about Azure service incidents and maintenance, not costs.',
      b: 'Azure Policy enforces rules on resources. It does not estimate prices.',
      c: 'Correct. The pricing calculator estimates the cost of planned Azure services.',
      d: 'Purview is for data governance and compliance, not cost estimation.',
    },
    learningTip:
      'Planning a budget before building? Start with the pricing calculator.',
    learnMoreUrl: LEARN.costManagement,
  },
  {
    id: 'mg-03',
    domainId: MG.id,
    domainName: MG.shortName,
    topic: 'Factors that affect cost',
    difficulty: 'intermediate',
    question: 'Which of the following can affect the cost of an Azure resource?',
    options: [
      { id: 'a', text: 'The Azure region where the resource is deployed' },
      { id: 'b', text: 'The colour theme selected in the Azure portal' },
      { id: 'c', text: 'The number of resource groups in the subscription' },
      { id: 'd', text: 'The number of tags applied to the resource' },
    ],
    correctAnswerId: 'a',
    explanation:
      'Prices for the same Azure service can differ between regions. Other cost factors include resource type, consumption, maintenance and network traffic (bandwidth) between regions.',
    optionExplanations: {
      a: 'Correct. The same service can cost different amounts in different regions.',
      b: 'The portal\u2019s visual theme is a personal display setting with no effect on billing.',
      c: 'Resource groups themselves are free. Creating more of them does not add cost.',
      d: 'Tags are free metadata. They help you track costs but do not change them.',
    },
    learningTip:
      'Cost factors to remember: resource type, usage, region, and bandwidth (data leaving a region).',
    learnMoreUrl: LEARN.costManagement,
  },
  {
    id: 'mg-04',
    domainId: MG.id,
    domainName: MG.shortName,
    topic: 'Resource tags',
    difficulty: 'beginner',
    question:
      'A university wants to see how much each department (for example, Medicine or Engineering) spends on Azure. What is the simplest way to organise resources for this report?',
    options: [
      { id: 'a', text: 'Apply resource locks to each department\u2019s resources' },
      { id: 'b', text: 'Deploy each department\u2019s resources in a different availability zone' },
      { id: 'c', text: 'Use Azure Advisor recommendations' },
      { id: 'd', text: 'Apply resource tags such as "Department: Engineering"' },
    ],
    correctAnswerId: 'd',
    explanation:
      'Resource tags are name-value pairs you attach to resources. They let you group and filter resources — for example in cost reports — by department, project or environment.',
    optionExplanations: {
      a: 'Locks prevent deletion or modification. They do not label resources for reporting.',
      b: 'Availability zones are about physical resilience, not organising costs by department.',
      c: 'Advisor gives optimisation recommendations but does not group costs by department.',
      d: 'Correct. Tags like "Department: Engineering" let you filter cost reports per department.',
    },
    learningTip:
      'Tags are like sticky labels on boxes — they help you find, group and report on resources.',
    learnMoreUrl: LEARN.governance,
  },
  {
    id: 'mg-05',
    domainId: MG.id,
    domainName: MG.shortName,
    topic: 'Azure Policy',
    difficulty: 'intermediate',
    question:
      'For data-residency reasons, a bank must ensure resources can only be created in specific Azure regions. Which service enforces this rule?',
    options: [
      { id: 'a', text: 'Azure role-based access control (RBAC)' },
      { id: 'b', text: 'Azure Policy' },
      { id: 'c', text: 'Resource locks' },
      { id: 'd', text: 'Azure Advisor' },
    ],
    correctAnswerId: 'b',
    explanation:
      'Azure Policy creates and enforces rules about resource properties, such as allowed regions or required tags. Non-compliant deployments can be blocked or flagged.',
    optionExplanations: {
      a: 'RBAC controls WHO can do something, not WHAT properties resources may have (like their region).',
      b: 'Correct. Azure Policy enforces rules like "only these regions are allowed".',
      c: 'Locks stop deletion or changes to existing resources; they do not restrict where new resources are created.',
      d: 'Advisor makes recommendations but cannot enforce or block deployments.',
    },
    learningTip:
      'RBAC controls WHO can act. Azure Policy controls WHAT is allowed.',
    learnMoreUrl: LEARN.governance,
  },
  {
    id: 'mg-06',
    domainId: MG.id,
    domainName: MG.shortName,
    topic: 'Resource locks',
    difficulty: 'beginner',
    question:
      'An administrator wants to prevent a production database from being accidentally deleted, even by users who have permission to delete it. What should they apply?',
    options: [
      { id: 'a', text: 'A Delete (CanNotDelete) resource lock' },
      { id: 'b', text: 'A resource tag' },
      { id: 'c', text: 'An Azure Advisor recommendation' },
      { id: 'd', text: 'An Azure pricing calculator estimate' },
    ],
    correctAnswerId: 'a',
    explanation:
      'A Delete (CanNotDelete) resource lock prevents a resource from being deleted while still allowing it to be used and modified. Locks apply even to users with high permissions, until the lock is removed.',
    optionExplanations: {
      a: 'Correct. A Delete lock blocks accidental deletion, even by users who would otherwise have permission.',
      b: 'Tags are labels. They do not protect a resource from being deleted.',
      c: 'Advisor offers recommendations; it cannot stop a deletion.',
      d: 'The pricing calculator estimates costs. It has no effect on deployed resources.',
    },
    learningTip:
      'Two lock types: Delete (can change, can\u2019t delete) and ReadOnly (can\u2019t change or delete).',
    learnMoreUrl: LEARN.governance,
  },
  {
    id: 'mg-07',
    domainId: MG.id,
    domainName: MG.shortName,
    topic: 'Microsoft Purview',
    difficulty: 'intermediate',
    question:
      'A company wants to discover, classify and govern its data across on-premises systems, multiple clouds and SaaS applications. Which service is designed for this?',
    options: [
      { id: 'a', text: 'Microsoft Entra ID' },
      { id: 'b', text: 'Azure Monitor' },
      { id: 'c', text: 'Microsoft Purview' },
      { id: 'd', text: 'Azure Arc' },
    ],
    correctAnswerId: 'c',
    explanation:
      'Microsoft Purview is a family of data governance, risk and compliance solutions. It helps you get a unified view of your data and classify and govern it wherever it lives.',
    optionExplanations: {
      a: 'Entra ID manages user identities and access, not data classification.',
      b: 'Azure Monitor collects performance metrics and logs, not data governance information.',
      c: 'Correct. Purview discovers, classifies and governs data across environments.',
      d: 'Azure Arc extends Azure management to servers and resources outside Azure, but it is not a data governance tool.',
    },
    learningTip:
      'Purview = a clear view over all your data: where it is, what it is and who should see it.',
    learnMoreUrl: LEARN.governance,
  },
  {
    id: 'mg-08',
    domainId: MG.id,
    domainName: MG.shortName,
    topic: 'Azure portal and command-line tools',
    difficulty: 'beginner',
    question:
      'An administrator wants to automate repetitive Azure tasks with commands in a script that runs on Windows, macOS or Linux. Which tool fits best?',
    options: [
      { id: 'a', text: 'The Azure portal' },
      { id: 'b', text: 'Azure CLI' },
      { id: 'c', text: 'The Azure pricing calculator' },
      { id: 'd', text: 'Microsoft Purview' },
    ],
    correctAnswerId: 'b',
    explanation:
      'The Azure CLI is a cross-platform command-line tool for creating and managing Azure resources. Commands can be combined into scripts to automate repetitive tasks.',
    optionExplanations: {
      a: 'The Azure portal is a web-based graphical interface — great for clicking through tasks, but not for scripted automation.',
      b: 'Correct. The Azure CLI runs on Windows, macOS and Linux and is ideal for scripting.',
      c: 'The pricing calculator estimates costs. It cannot manage resources.',
      d: 'Purview is for data governance, not for scripting resource management.',
    },
    learningTip:
      'Portal = clicking. CLI and PowerShell = typing commands and scripting repeatable tasks.',
    learnMoreUrl: LEARN.deployTools,
  },
  {
    id: 'mg-09',
    domainId: MG.id,
    domainName: MG.shortName,
    topic: 'Azure Resource Manager',
    difficulty: 'intermediate',
    question: 'Which statement about Azure Resource Manager (ARM) is correct?',
    options: [
      { id: 'a', text: 'It is a monitoring service that only collects logs' },
      { id: 'b', text: 'It is a type of virtual machine optimised for databases' },
      { id: 'c', text: 'It is a tool used only to estimate Azure costs' },
      { id: 'd', text: 'It is the deployment and management layer that handles requests from the portal, CLI, PowerShell and SDKs' },
    ],
    correctAnswerId: 'd',
    explanation:
      'Azure Resource Manager is the deployment and management service for Azure. Every request — whether from the portal, Azure CLI, PowerShell, REST APIs or SDKs — passes through ARM, which authenticates and authorises it.',
    optionExplanations: {
      a: 'Collecting logs and metrics is the job of Azure Monitor, not Resource Manager.',
      b: 'ARM is not a virtual machine. It is the management layer that creates and manages resources like VMs.',
      c: 'Estimating costs is the job of the pricing calculator.',
      d: 'Correct. ARM is the single management layer all Azure tools talk to.',
    },
    learningTip:
      'All roads lead to ARM: portal, CLI, PowerShell and SDKs all send requests through Resource Manager.',
    learnMoreUrl: LEARN.deployTools,
  },
  {
    id: 'mg-10',
    domainId: MG.id,
    domainName: MG.shortName,
    topic: 'Azure Advisor',
    difficulty: 'beginner',
    question:
      'Which Azure service analyses your deployed resources and gives personalised recommendations to improve cost, security, reliability and performance?',
    options: [
      { id: 'a', text: 'Azure Advisor' },
      { id: 'b', text: 'Azure Policy' },
      { id: 'c', text: 'Azure Service Health' },
      { id: 'd', text: 'Azure Resource Manager' },
    ],
    correctAnswerId: 'a',
    explanation:
      'Azure Advisor evaluates your Azure resources and makes personalised recommendations across categories such as cost, security, reliability, operational excellence and performance.',
    optionExplanations: {
      a: 'Correct. Advisor is your personalised "best practices consultant" for Azure.',
      b: 'Azure Policy enforces rules you define. It does not generate improvement recommendations across these categories.',
      c: 'Service Health reports Azure platform incidents and maintenance, not optimisation tips for your resources.',
      d: 'Resource Manager handles deployments and management requests; it does not advise.',
    },
    learningTip:
      'Advisor ADVISES: it suggests improvements, but it does not enforce anything.',
    learnMoreUrl: LEARN.monitoring,
  },
  {
    id: 'mg-11',
    domainId: MG.id,
    domainName: MG.shortName,
    topic: 'Azure Monitor',
    difficulty: 'beginner',
    question:
      'A school\u2019s IT team wants to collect performance metrics from its Azure virtual machines and receive an alert when CPU usage stays above 90%. Which service should they use?',
    options: [
      { id: 'a', text: 'Microsoft Purview' },
      { id: 'b', text: 'Resource locks' },
      { id: 'c', text: 'Azure Monitor' },
      { id: 'd', text: 'Azure pricing calculator' },
    ],
    correctAnswerId: 'c',
    explanation:
      'Azure Monitor collects, analyses and acts on metrics and logs from your resources. You can create alert rules, for example when CPU usage crosses a threshold.',
    optionExplanations: {
      a: 'Purview governs data, not performance metrics.',
      b: 'Resource locks prevent changes or deletion; they do not monitor anything.',
      c: 'Correct. Azure Monitor collects metrics and logs and triggers alerts.',
      d: 'The pricing calculator estimates costs, not performance.',
    },
    learningTip:
      'Azure Monitor = metrics + logs + alerts. If it\u2019s about "watch and notify", think Monitor.',
    learnMoreUrl: LEARN.monitoring,
  },
]

const QUESTION_MAP = new Map(QUESTIONS.map((q) => [q.id, q]))

export function getQuestionById(id: string): Question | undefined {
  return QUESTION_MAP.get(id)
}
