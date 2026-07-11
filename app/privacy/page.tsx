import type { Metadata } from "next";
import { PolicyLayout } from "@/components/PolicyLayout";
import { site } from "@/lib/site";

const privacyUrl = "https://www.indusautomationlabs.com/privacy";
const websiteUrl = "https://www.indusautomationlabs.com/";
const privacyMailto = "mailto:" + site.email + "?subject=Privacy%20Request";

const contents = [
  ["introduction", "Introduction"],
  ["website-information", "Website information"],
  ["autochat-information", "Information processed by AutoChat"],
  ["local-storage", "Local storage and user controls"],
  ["ai-processing", "AI and voice processing"],
  ["whatsapp", "WhatsApp integration"],
  ["credentials", "API keys and credentials"],
  ["licensing-store", "Licensing and Microsoft Store"],
  ["purposes", "Purposes of processing"],
  ["sharing", "Data sharing"],
  ["retention", "Retention and deletion"],
  ["security", "Security"],
  ["international", "International processing"],
  ["children", "Children"],
  ["business-responsibilities", "Business-user responsibilities"],
  ["rights", "Privacy rights"],
  ["changes", "Policy changes"],
  ["contact", "Contact"],
] as const;

export const metadata: Metadata = {
  title: "Privacy Policy - AutoChat",
  description:
    "Privacy Policy for Indus Automation Labs, AutoChat v1.0.0, website visitors, license users, Microsoft Store distribution, and support contacts.",
  alternates: {
    canonical: privacyUrl
  },
  openGraph: {
    type: "website",
    url: privacyUrl,
    title: "AutoChat Privacy Policy | Indus Automation Labs",
    description:
      "How Indus Automation Labs and AutoChat v1.0.0 process, store, use, disclose, and protect information."
  }
};

export default function PrivacyPage() {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="July 11, 2026">
      <div className="rounded-2xl border border-cyanGlow/20 bg-cyanGlow/[0.06] p-5 sm:p-6">
        <p className="!mt-0 font-semibold text-white">Privacy summary</p>
        <p>
          AutoChat v1.0.0 is a Windows desktop application that primarily stores business and customer-support data on
          the business user&apos;s own device. Information is sent outside the device only when a connected feature
          requires it, such as WhatsApp, a user-configured AI or cloud voice provider, licensing, updates, Microsoft
          Store services, or user-requested support. Indus Automation Labs does not sell personal information.
        </p>
        <p className="text-sm text-slate-400">
          This summary highlights the main points. The complete policy below explains the data, purposes, providers,
          controls, retention, and responsibilities in more detail.
        </p>
      </div>

      <nav
        aria-label="Privacy Policy contents"
        className="mt-8 rounded-2xl border border-white/[0.1] bg-white/[0.035] p-5 sm:p-6"
      >
        <p className="!mt-0 text-sm font-semibold uppercase tracking-[0.16em] text-cyanGlow">On this page</p>
        <ol className="mt-4 grid list-none gap-x-6 gap-y-2 !p-0 sm:grid-cols-2">
          {contents.map(([id, label], index) => (
            <li key={id} className="text-sm leading-6">
              <a className="inline-flex gap-2 text-slate-300 transition hover:text-white" href={"#" + id}>
                <span className="font-mono text-xs text-slate-500">{String(index + 1).padStart(2, "0")}</span>
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <h2 id="introduction" className="scroll-mt-28">Introduction</h2>
      <p>
        This Privacy Policy explains how Indus Automation Labs (&quot;Indus Automation Labs,&quot; &quot;we,&quot;
        &quot;us,&quot; or &quot;our&quot;) handles information in connection with the AutoChat v1.0.0 desktop
        application, the Indus Automation Labs website, licensing and purchase requests, customer support, and related
        services. It applies to website visitors, AutoChat business users, customers and license users, and people who
        contact us for support or other business purposes.
      </p>
      <p>
        Indus Automation Labs is an independent software brand operated by Muhammad Hamza Shoaib. References to
        &quot;Indus Automation Labs,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot; in this policy refer to Muhammad
        Hamza Shoaib operating under the Indus Automation Labs brand.
      </p>
      <p>
        AutoChat is intended for small and medium-sized businesses across different industries and store types. In this
        policy, a &quot;business user&quot; means the organization or person who installs, configures, or operates
        AutoChat, while a &quot;customer&quot; may mean an individual whose conversation or order information is
        processed by that business user.
      </p>
      <p><strong>Effective date and last updated:</strong> July 11, 2026.</p>

      <h2 id="website-information" className="scroll-mt-28">Information processed by the website</h2>
      <p>
        The website is a public informational website. The website&apos;s hosting and network providers may automatically
        process ordinary server and security logs, which can include an IP address, browser type, device or operating
        system information, requested page, referring page, request date and time, and error or security information.
        Whether and how such logs are created depends on the hosting provider and the request.
      </p>
      <p>
        The current website does not provide a functioning customer account login or public checkout. Its visible
        inquiry form is a local interface preview and does not transmit or store the entered form data on our server.
        If you contact us by email, we may process the name, email address, business name, message, attachments, and
        communication history you choose to provide so we can respond and provide support.
      </p>
      <p>
        We do not currently add website analytics or advertising trackers in the application code. If the website later
        adds a working account, checkout, contact submission, analytics, or similar feature, this policy will be updated
        before or when that change applies.
      </p>

      <h2 id="autochat-information" className="scroll-mt-28">Information processed by AutoChat</h2>
      <p>Depending on how a business user configures and uses AutoChat, the application may process:</p>
      <ul>
        <li>
          authorized WhatsApp customer conversations, including contact identifiers, customer names, phone numbers,
          incoming and outgoing message text, timestamps, drafts, reply status, and recent conversation history;
        </li>
        <li>
          customer profile and memory information, such as names, phone numbers, delivery addresses, cities or towns,
          preferences, notes, payment-method labels, and previous order summaries;
        </li>
        <li>
          carts and order information, including products, quantities, variants, prices, stock context, delivery or
          pickup details, address, city, province, phone number, email address, payment-method choice, order status, and
          related customer notes;
        </li>
        <li>
          business data such as business profile settings, catalog and product information, FAQs, policies, business
          knowledge, supplier records and cases, workflow rules, payment instructions, and application configuration;
        </li>
        <li>
          training items, owner decisions, customer-specific memory, contact-control settings, pending AI drafts, and
          operational events used to provide the configured workflow;
        </li>
        <li>
          application settings, enabled features, model and voice settings, license status, a pseudonymous device
          identifier, application version, update state, security events, diagnostic/error information, and support
          information; and
        </li>
        <li>
          voice-note audio, reply text, generated audio files, and transcripts when the corresponding voice feature is
          enabled and used.
        </li>
      </ul>
      <p>
        AutoChat does not require every category above for every user. The information processed depends on the features
        the business enables, the data it enters, and the content customers send to its authorized WhatsApp account.
      </p>

      <h2 id="local-storage" className="scroll-mt-28">Local storage and user controls</h2>
      <p>
        AutoChat primarily stores operational data locally on the Windows device running the application. In a packaged
        installation, the application data is normally held under the Windows application-data location for AutoChat,
        commonly <code>%APPDATA%\autochat</code>. Local files can include business settings, products, messages,
        pending drafts, customer memory, carts, orders, training data, business knowledge, suppliers and supplier cases,
        license information, API settings, support and security events, update state, WhatsApp Web session information,
        and generated voice files.
      </p>
      <p>
        AutoChat provides controls to delete certain individual records, including products, customer memories, business
        knowledge, suppliers, and supplier cases; clear a customer cart; reset setup status; and clear saved AI or voice
        provider credentials. It also provides a business-data backup export and restore feature. The backup excludes
        license, API-secret, and security-state files by default, but it can contain other business and customer data.
        Product catalog data can also be exported in supported formats.
      </p>
      <p>
        AutoChat v1.0.0 does not provide one in-app control that erases every local file. Uninstalling AutoChat may not
        automatically delete every file in the Windows application-data folder, exported backup, product export,
        generated audio folder, or other user-selected location. Users should review and securely remove those files
        separately when they are no longer needed. Data stored only on the user&apos;s device is generally not available
        to Indus Automation Labs for remote deletion.
      </p>

      <h2 id="ai-processing" className="scroll-mt-28">AI and voice processing</h2>
      <p>
        When a business user configures and uses AI features, AutoChat may send relevant content to OpenRouter and to the
        model provider made available through the user-selected OpenRouter model. The transmitted context can include a
        customer message, recent conversation history, business profile or policies, matching catalog data, business
        knowledge, customer memory, cart or order context, and instructions needed to generate, classify, or structure a
        response. AutoChat sends this information only as part of the configured AI workflow.
      </p>
      <p>
        Optional cloud voice features use ElevenLabs when enabled. Voice-note transcription may send the selected audio
        file and transcription instructions to ElevenLabs. Cloud text-to-speech may send reply text and voice/model
        settings to ElevenLabs and store the returned audio locally. AutoChat&apos;s Local Basic voice-generation mode uses
        local model files for supported text-to-speech and does not require sending that reply text to an online voice
        provider. Local voice-note transcription is not currently implemented in AutoChat v1.0.0.
      </p>
      <p>
        OpenRouter, the model provider selected through it, and ElevenLabs process information under their own terms,
        account settings, and privacy policies. Their retention, training, security, and international-transfer practices
        are not controlled by Indus Automation Labs. Business users should review the
        <a href="https://openrouter.ai/privacy" target="_blank" rel="noreferrer"> OpenRouter Privacy Policy</a> and
        <a href="https://elevenlabs.io/privacy-policy" target="_blank" rel="noreferrer"> ElevenLabs Privacy Policy</a>,
        as well as the terms for the specific model they select.
      </p>

      <h2 id="whatsapp" className="scroll-mt-28">WhatsApp integration</h2>
      <p>
        AutoChat connects through a WhatsApp Web session that the business user authorizes, normally by scanning a QR
        code from the linked-device controls of its own WhatsApp account. Session information is stored locally so the
        authorized connection can continue. Messages and media also pass through WhatsApp&apos;s systems and are subject to
        the account holder&apos;s agreement with WhatsApp and the applicable
        <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noreferrer"> WhatsApp Privacy Policy</a>.
      </p>
      <p>
        The business user is responsible for account authorization and for the lawfulness of its customer communications,
        notices, permissions, consent, retention, and use of customer data. AutoChat and Indus Automation Labs are not
        affiliated with, endorsed by, sponsored by, or officially connected to WhatsApp or Meta.
      </p>

      <h2 id="credentials" className="scroll-mt-28">API keys and credentials</h2>
      <p>
        User-provided OpenRouter and ElevenLabs credentials are stored locally. AutoChat is designed to use Electron&apos;s
        protected <code>safeStorage</code> mechanism when encryption is available on the Windows device. The interface
        displays masked credential status and provides controls to clear saved provider credentials. WhatsApp session
        information is also stored locally as part of the authorized session.
      </p>
      <p>
        Protection depends on the Windows environment, device configuration, account security, and availability of the
        platform storage mechanism. No storage method is completely secure. Users are responsible for securing their
        Windows account, device, WhatsApp account, AI and voice provider accounts, license key, and API credentials; for
        limiting access to authorized personnel; and for revoking or rotating credentials when compromise is suspected.
      </p>

      <h2 id="licensing-store" className="scroll-mt-28">Licensing, purchase requests, and Microsoft Store</h2>
      <p>
        AutoChat may process a license key, license status, plan, activation and verification dates, application version,
        and a pseudonymous device identifier derived locally from device and Windows-account attributes. These details
        may be sent to the AutoChat license service to activate, verify, restore, secure, or manage access and to prevent
        misuse or fraud.
      </p>
      <p>
        If a user submits an AutoChat license purchase request through the application, the request can include the
        customer or business name, phone number or email address, voucher code, selected payment method, payment-proof
        image, device identifier, application version, purchase identifier, status, and related approval information.
        These details are used to quote, review, approve, activate, and support the requested license. The current website
        does not process this purchase request.
      </p>
      <p>
        When AutoChat is acquired, updated, entitled, or paid for through Microsoft Store, Microsoft may process Microsoft
        account, device, acquisition, installation, entitlement, transaction, payment, update, and Store-usage information
        under the
        <a href="https://www.microsoft.com/privacy/privacystatement" target="_blank" rel="noreferrer"> Microsoft Privacy Statement</a>.
        AutoChat may use entitlement or transaction status needed to provide access where such Store functionality is
        enabled. Microsoft controls its Store processing, and Indus Automation Labs does not receive full payment-card
        details from Microsoft. Store-packaged AutoChat builds use Microsoft Store as their update channel; non-Store
        builds may check the AutoChat update service using the installed version and ordinary network request information.
      </p>

      <h2 id="purposes" className="scroll-mt-28">Purposes of processing</h2>
      <p>We process information as reasonably necessary to:</p>
      <ul>
        <li>operate, deliver, and maintain the AutoChat application and website;</li>
        <li>
          provide customer messaging, conversation management, AI drafts, product search, carts, orders, customer memory,
          training, supplier, voice, backup, configuration, and support functionality;
        </li>
        <li>activate, verify, restore, and manage licenses, entitlements, purchase requests, and updates;</li>
        <li>respond to support, privacy, billing, legal, security, and business requests;</li>
        <li>diagnose errors, maintain reliability, secure systems, and improve features and user experience; and</li>
        <li>detect, investigate, prevent, and respond to misuse, fraud, tampering, security incidents, or legal obligations.</li>
      </ul>

      <h2 id="sharing" className="scroll-mt-28">Data sharing</h2>
      <p><strong>Indus Automation Labs does not sell personal information.</strong></p>
      <p>Information may be disclosed only as relevant to the feature or purpose involved, including to:</p>
      <ul>
        <li>
          WhatsApp/Meta for the user-authorized messaging session, and OpenRouter, model providers available through it,
          or ElevenLabs when the corresponding external feature is configured and used;
        </li>
        <li>Microsoft for Microsoft Store distribution, updates, purchases, or entitlements where applicable;</li>
        <li>
          infrastructure, website-hosting, license, update, email, and support-service providers that help us operate the
          relevant service;
        </li>
        <li>
          professional advisers, auditors, transaction counterparties, or service providers where reasonably necessary
          and subject to appropriate obligations; and
        </li>
        <li>
          courts, regulators, law-enforcement bodies, or other authorities when required by law or reasonably necessary to
          protect rights, safety, systems, users, or the public.
        </li>
      </ul>
      <p>
        Bug reports and diagnostic details are sent to our support service only when the user submits the relevant report
        or starts the relevant support workflow. Limited license, security, and tamper-event information may also be sent
        to protect licensed access and prevent misuse. Support payloads are designed to redact API keys, tokens,
        passwords, and similar secrets, but users should still review information before submitting it.
      </p>

      <h2 id="retention" className="scroll-mt-28">Retention and deletion</h2>
      <p>
        Local AutoChat data remains on the user&apos;s device until the user deletes an applicable record, clears or resets
        an applicable setting, removes files, deletes the application-data folder, or otherwise removes the data.
        Uninstalling AutoChat may not remove every locally stored file. Exported backups and files saved outside the
        AutoChat data folder remain until separately deleted by the user.
      </p>
      <p>
        Website-hosting logs, support communications, license and purchase records, security information, and related
        service records are retained only for as long as reasonably necessary for operations, support, licensing,
        security, billing, fraud prevention, legal compliance, dispute resolution, and enforcement. We do not promise a
        fixed retention period where one has not been implemented or where legal and operational needs differ.
      </p>
      <p>
        External providers determine retention for information they process under their own terms and policies. A request
        to us does not automatically delete information held independently by WhatsApp, Microsoft, OpenRouter, a selected
        model provider, ElevenLabs, an email provider, or another third party. Users may need to make a separate request
        to that provider.
      </p>

      <h2 id="security" className="scroll-mt-28">Security</h2>
      <p>
        We use reasonable technical and organizational measures appropriate to the nature of the service and information.
        Depending on the feature, these measures include local application-data storage, Windows account and device
        protections, protected local storage for provider credentials where available, credential masking, secret
        redaction in support payloads, license-integrity and abuse controls, restricted application interfaces, update
        verification controls, and limiting processing to operational purposes.
      </p>
      <p>
        No device, application, transmission, provider, or storage system is completely secure. We do not guarantee
        absolute security. Business users should maintain Windows and AutoChat updates, use appropriate device encryption
        and access controls, protect backups, restrict operator access, and promptly revoke exposed credentials.
      </p>

      <h2 id="international" className="scroll-mt-28">International processing</h2>
      <p>
        Indus Automation Labs and external providers may process information in countries other than the country where the
        business user or customer is located. This can occur when using website hosting, email, WhatsApp, OpenRouter and
        its model providers, ElevenLabs, Microsoft Store, licensing, updates, payment-related services, or support
        infrastructure. Those countries may have different privacy laws. Where required, the responsible party should use
        applicable legal safeguards for international transfers.
      </p>

      <h2 id="children" className="scroll-mt-28">Children</h2>
      <p>
        AutoChat is intended for businesses and adult business operators. It is not directed to children, and Indus
        Automation Labs does not knowingly solicit children&apos;s personal information through AutoChat or the website.
        Business users must avoid intentionally using AutoChat to process children&apos;s information unless they have a
        lawful basis, provide required notices, obtain any required parental or guardian consent, and comply with all
        applicable child-privacy laws.
      </p>

      <h2 id="business-responsibilities" className="scroll-mt-28">User and business responsibilities</h2>
      <p>
        The business user controls which WhatsApp account, customer data, catalog, business knowledge, provider accounts,
        and workflows are connected to AutoChat. Depending on applicable law, the business user may be the controller or
        primary responsible party for the customer and employee information it imports or processes.
      </p>
      <p>Business users are responsible for:</p>
      <ul>
        <li>having authority to use the connected accounts and process the imported or received information;</li>
        <li>providing legally required privacy notices and obtaining required permissions or consent;</li>
        <li>configuring access, operating modes, retention, providers, and customer communications lawfully;</li>
        <li>
          avoiding unnecessary sensitive information in customer messages, AI prompts, support reports, voice requests,
          catalogs, memory, and order notes;
        </li>
        <li>
          not requesting or storing full payment-card numbers, security codes, passwords, government identifiers, health
          information, or other highly sensitive data unless strictly necessary, lawful, and appropriately protected; and
        </li>
        <li>responding to customer privacy requests relating to data held on the business user&apos;s own device or accounts.</li>
      </ul>

      <h2 id="rights" className="scroll-mt-28">Privacy rights</h2>
      <p>
        Depending on applicable law and the circumstances, an individual may have rights to request access, correction,
        deletion, restriction, portability, or objection; to withdraw consent; or to complain to a privacy regulator.
        These rights can be subject to identity verification, legal exceptions, and the roles of the relevant business
        user and third-party provider.
      </p>
      <p>
        For data stored only on a business user&apos;s computer, WhatsApp account, provider account, or exported backup, the
        request normally must be handled directly by that business user or through the relevant device, application, or
        provider controls. Indus Automation Labs cannot access or delete local-only AutoChat data remotely. For
        information we control, send a request to <a href={privacyMailto}>{site.email}</a>. We may ask for reasonable
        information to verify the request and locate the relevant records.
      </p>

      <h2 id="changes" className="scroll-mt-28">Changes to this policy</h2>
      <p>
        We may revise this Privacy Policy when AutoChat, the website, providers, distribution, legal requirements, or data
        practices change. The revised policy will be posted at this same <code>/privacy</code> route with an updated
        effective or last-updated date. Material changes may also be communicated through the application, website, Store
        listing, email, or another appropriate channel where required.
      </p>

      <h2 id="contact" className="scroll-mt-28">Contact</h2>
      <p>
        For privacy questions, requests, or concerns, contact Indus Automation Labs at
        <a href={privacyMailto}> {site.email}</a>.
      </p>
      <p>
        Website: <a href={websiteUrl}>{websiteUrl}</a>
      </p>
    </PolicyLayout>
  );
}
