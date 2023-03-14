import { Input } from 'antd';
import { Link } from 'react-router-dom';
import HOCProps from '../types/HOCProps';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import './Markdown.css';

const { Search } = Input;

const PrivacyPolicyComponent = (props: HOCProps) => {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Hero content */}
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
          {/* Section header */}
          <div className="max-w-3xl mx-auto pb-12 md:pb-16">
            <ReactMarkdown children={markdownContent} remarkPlugins={[remarkGfm]} />
          </div>
        </div>
      </div>
    </section>
  );
}

const markdownContent = `
# POLLS FOR PI PRIVACY POLICY

## Effective date: March 6, 2023

Blurtopian (@blurtopian) ("us", "we", or "our") provides and operates Polls for Pi (the "Service").

This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.

This privacy notice for Blurtopian Information Services, (doing business as Blurtopian) ("Company," "we," "us," or "our"), describes how and why we might collect, store, use, and/or share ("process") your information when you use our services ("Services"), such as when you:

Visit our website at http://pipolls.blurtkey.com/, or any website of ours that links to this privacy notice
Engage with us in other related ways ― including any sales, marketing, or events

Questions or concerns? Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at blurtopian@gmail.com.

### WHAT INFORMATION DO WE COLLECT?

We collect information that you voluntarily provide to us when you register or login to our app, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.

* Sensitive Information: We do not process sensitive information.
* Payment Data: We may collect data necessary to process your payment if you make deposit of fees or payments, such as your Pi wallet’s public address, transaction hash, and payment ID. All payment data is stored in our transaction database and in the Pi Blockchain which is publicly available. **NOTE, WE DO NOT COLLECT OR STORE YOUR PI WALLET PASSPHRASE.**
* Pi Network account Login Data: We may provide you with the option to register with us using your Pi Network account. If you choose to register in this way, we will only collect your Pi username to authenticate and log you into our app.
* Information automatically collected: Some information such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our website. We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.

Like many businesses, we also collect information through cookies and similar technologies. You can find out more about this in our Cookie Notice on our website. The information we collect includes:

* Log and Usage Data: Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called "crash dumps"), and hardware settings).
* Device Data: We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system, and system configuration information.
* Location Data: We collect location data such as information about your device's location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. However, if you choose to opt out, you may not be able to use certain aspects of the Services.

### HOW DO WE PROCESS YOUR INFORMATION?

In Short: We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information for a variety of reasons, depending on how you interact with our Services, including:

* To facilitate account creation and authentication and otherwise manage user accounts. We may process your information so you can create and log in to your account, as well as keep your account in working order.
* To deliver and facilitate delivery of services to the user. We may process your information to provide you with the requested service.
* To respond to user inquiries/offer support to users. We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.
* To send administrative information to you. We may process your information to send you details about our products and services, changes to our terms and policies, and other similar information.
* To fulfill and manage your orders. We may process your information to fulfill and manage your orders, payments, returns, and exchanges made through the Services.
* To enable user-to-user communications. We may process your information if you choose to use any of our offerings that allow for communication with another user.
* To request feedback. We may process your information when necessary to request feedback and to contact you about your use of our Services.
* To protect our Services. We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.
* To identify usage trends. We may process information about how you use our Services to better understand how they are being used so we can improve them.
* To determine the effectiveness of our marketing and promotional campaigns. We may process your information to better understand how to provide marketing and promotional campaigns that are most relevant to you.
* To save or protect an individual's vital interest. We may process your information when necessary to save or protect an individual’s vital interest, such as to prevent harm.


### WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?

In Short: We only process your information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.

_If you are located in the EU or UK, this section applies to you._

The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your information. As such, we may rely on the following legal bases to process your information:

* Consent: We may process your information if you have given us permission (i.e., consent) to use your information for a specific purpose. You can withdraw your consent at any time.
* Performance of a Contract: We may process your information when we believe it is necessary to fulfill our contractual obligations to you, including providing our Services or at your request prior to entering into a contract with you.
* Legitimate Interests: We may process your information when we believe it is reasonably necessary to achieve our legitimate business interests and those interests do not outweigh your interests and fundamental rights and freedoms. For example, we may process your information for some of the purposes described in order to:
  * Send users information about special offers and discounts on our products and services;
  * Analyze how our services are used so we can improve them to engage and retain users;
  * Support our marketing activities;
  * Diagnose problems and/or prevent fraudulent activities;
  * Understand how our users use our products and services so we can improve user experience.

* Legal Obligations: We may process your information where we believe it is necessary for compliance with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency, exercise or defend our legal rights, or disclose your information as evidence in litigation in which we are involved.
Vital Interests: We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party, such as situations involving potential threats to the safety of any person.

In legal terms, we are generally the “data controller” under European data protection laws of the information described in this privacy notice, since we determine the means and/or purposes of the data processing we perform. This privacy notice does not apply to the information we process as a “data processor” on behalf of our customers. In those situations, the customer that we provide services to and with whom we have entered into a data processing agreement is the “data controller” responsible for your information, and we merely process your information on their behalf in accordance with your instructions. If you want to know more about our customers' privacy practices, you should read their privacy policies and direct any questions you have to them.

_If you are located in Canada, this section applies to you._

We may process your information if you have given us specific permission (i.e., express consent) to use your information for a specific purpose, or in situations where your permission can be inferred (i.e., implied consent). You can withdraw your consent at any time.

In some exceptional cases, we may be legally permitted under applicable law to process your information without your consent, including, for example:

* If collection is clearly in the interests of an individual and consent cannot be obtained in a timely way
* For investigations and fraud detection and prevention
* For business transactions provided certain conditions are met
* If it is contained in a witness statement and the collection is necessary to assess, process, or settle an insurance claim
* For identifying injured, ill, or deceased persons and communicating with next of kin
* If we have reasonable grounds to believe an individual has been, is, or may be victim of financial abuse
* If it is reasonable to expect collection and use with consent would compromise the availability or the accuracy of the information and the collection is reasonable for purposes related to investigating a breach of an agreement or a contravention of the laws of Canada or a province
* If disclosure is required to comply with a subpoena, warrant, court order, or rules of the court relating to the production of records
* If it was produced by an individual in the course of their employment, business, or profession and the collection is consistent with the purposes for which the information was produced
* If the collection is solely for journalistic, artistic, or literary purposes
* If the information is publicly available and is specified by the regulations

### WHEN AND WITH WHOM DO WE SHARE YOUR INFORMATION?

In Short: We may share information in specific situations described in this section and/or with the following categories of third parties.

Vendors, Consultants, and Other Third-Party Service Providers. We may share your data with third-party vendors, service providers, contractors, or agents (“third parties”) who perform services for us or on our behalf and require access to such information to do that work. We have contracts in place with our third parties, which are designed to help safeguard your information. This means that they cannot do anything with your information unless we have instructed them to do it. They will also not share your information with any organization apart from us. They also commit to protect the data they hold on our behalf and to retain it for the period we instruct. The categories of third parties we may share personal information with are as follows:

* Cloud Computing Services
* Communication & Collaboration Tools
* Data Analytics Services
* Data Storage Service Providers
* Finance & Accounting Tools
* Government Entities
* Performance Monitoring Tools
* Product Engineering & Design Tools
* Testing Tools
* User Account Registration & Authentication

We also may need to share your information in the following situations:

* Business Transfers: We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
* Affiliates: We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy notice. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us.
* Business Partners: We may share your information with our business partners to offer you certain products, services, or promotions.
* Other Users: When you share information (for example, creating work or talent profiles/listings) or otherwise interact with public areas of the Services, such information may be viewed by all users and may be publicly made available outside the Services in perpetuity. Similarly, other users will be able to view descriptions of your activity, communicate with you within our Services, and view your profile page.

### WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?

In Short: We are not responsible for the safety of any information that you share with third parties that we may link to or who advertise on our Services, but are not affiliated with, our Services.

The Services, may link to third-party websites, online services, or mobile applications and/or contain advertisements from third parties that are not affiliated with us and which may link to other websites, services, or applications. Accordingly, we do not make any guarantee regarding any such third parties, and we will not be liable for any loss or damage caused by the use of such third-party websites, services, or applications. The inclusion of a link towards a third-party website, service, or application does not imply an endorsement by us. We cannot guarantee the safety and privacy of data you provide to any third parties. Any data collected by third parties is not covered by this privacy notice. We are not responsible for the content or privacy and security practices and policies of any third parties, including other websites, services, or applications that may be linked to or from the Services. You should review the policies of such third parties and contact them directly to respond to your questions.

### DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?

In Short: We may use cookies and other tracking technologies to collect and store your information.

We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.

### IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?

In Short: We may transfer, store, and process your information in countries other than your own.

Our server is located in Japan. If you are accessing our Services from outside this location, please be aware that your information may be transferred to, stored, and processed by us in our facilities and by those third parties with whom we may share your information (see "WHEN AND WITH WHOM DO WE SHARE YOUR INFORMATION?" above), in the Countries where Third-Party Servers are Located, and other countries.

If you are a resident in the European Economic Area (EEA) or United Kingdom (UK), then these countries may not necessarily have data protection laws or other similar laws as comprehensive as those in your country. However, we will take all necessary measures to protect your information in accordance with this privacy notice and applicable law.

European Commission's Standard Contractual Clauses:

We have implemented measures to protect your information, including by using the European Commission's Standard Contractual Clauses for transfers of information between our group companies and between us and our third-party providers. These clauses require all recipients to protect all information that they process originating from the EEA or UK in accordance with European data protection laws and regulations. We have implemented similar appropriate safeguards with our third-party service providers and partners and further details can be provided upon request.


### HOW LONG DO WE KEEP YOUR INFORMATION?

In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.

We will only keep your information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your information for longer than the period of time in which users have an account with us.

When we have no ongoing legitimate business need to process your information, we will either delete or anonymize such information, or, if this is not possible (for example, because your information has been stored in backup archives), then we will securely store your information and isolate it from any further processing until deletion is possible.

### HOW DO WE KEEP YOUR INFORMATION SAFE?

In Short: We aim to protect your information through a system of organizational and technical security measures.

We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your information, transmission of information to and from our Services is at your own risk. You should only access the Services within a secure environment.

### DO WE COLLECT INFORMATION FROM MINORS?

In Short: We do not knowingly collect data from or market to children under 18 years of age.

We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services. If we learn that information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at blurtopian@gmail.com.

### WHAT ARE YOUR PRIVACY RIGHTS?

In Short: In some regions, such as the European Economic Area (EEA), United Kingdom (UK), and Canada, you have rights that allow you greater access to and control over your information. You may review, change, or terminate your account at any time.

In some regions (like the EEA, UK, and Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your information, (ii) to request rectification or erasure; (iii) to restrict the processing of your information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your information. You can make such a request by contacting us by using the contact details provided in the section “HOW CAN YOU CONTACT US ABOUT THIS POLICY?” below.

We will consider and act upon any request in accordance with applicable data protection laws.

If you are located in the EEA or UK and you believe we are unlawfully processing your information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details here: https://ec.europa.eu/justice/data- protection/bodies/authorities/index_en.htm .

If you are located in Switzerland, the contact details for the data protection authorities are available here: https://www.edoeb.admin.ch/edoeb/en/home.html .

Withdrawing your consent: If we are relying on your consent to process your information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS POLICY?" below or updating your preferences.

However, please note that this will not affect the lawfulness of the processing before its withdrawal, nor when applicable law allows, will it affect the processing of your information conducted in reliance on lawful processing grounds other than consent.

Account Information

If you would at any time like to review or change the information in your account or terminate your account, you can:

Log in to your account settings and update your user account.
Contact us using the contact information provided.


Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.

Cookies and similar technologies: Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services. To opt out of interest-based advertising by advertisers on our Services visit http://www.aboutads.info/choices/ . For further information, please see our Cookie Notice.

If you have questions or comments about your privacy rights, you may email us at blurtopian@gmail.com .

###  CONTROLS FOR DO-NOT-TRACK FEATURES

Most web browsers and some mobile operating systems and mobile applications include a Do- Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy policy.

### DO WE MAKE UPDATES TO THIS POLICY?

In Short: Yes, we will update this policy as necessary to stay compliant with relevant laws.

We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy policy, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.

### HOW CAN YOU CONTACT US ABOUT THIS POLICY?

If you have questions or comments about this notice, you may contact our Data Protection Officer (DPO) by email at blurtopian@gmail.com .

### HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?

Based on the applicable laws of your country, you may have the right to request access to the information we collect from you, change that information, or delete it in some circumstances. To request to review, update, or delete your information, please contact us via our email at blurtopian@gmail.com .
`;

export default PrivacyPolicyComponent;