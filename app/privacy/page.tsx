import LegalPage from '../components/LegalPage';

export const metadata = {
  title: 'Privacy Policy — Divinus Investment Group',
  description: 'How Divinus Investment Group Limited collects, uses, and protects personal information.',
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="3 June 2026"
      lede="This policy explains what personal information Divinus Investment Group Limited collects when you use this website, how we use it, and the rights you have over it."
    >
      <section>
        <h2>Who we are</h2>
        <p>
          This website is operated by <strong>Divinus Investment Group Limited</strong>, a company
          registered in England &amp; Wales (“Divinus”, “we”, “us”). We are the data controller
          responsible for the personal information described in this policy. You can reach us about
          privacy matters at <a href="mailto:divinusblack@gmail.com">divinusblack@gmail.com</a>.
        </p>
      </section>

      <section>
        <h2>Information we collect</h2>
        <p>We only collect personal information that you choose to give us. Specifically:</p>
        <ul>
          <li><strong>Contact submissions.</strong> When you use our contact form, we collect your name, email address, the subject you select, any phone number you provide, and the contents of your message.</li>
          <li><strong>Newsletter subscriptions.</strong> When you subscribe, we collect your email address.</li>
          <li><strong>Technical information.</strong> Like most websites, our hosting infrastructure may automatically log basic technical data such as IP address, browser type, and pages requested, for security and to keep the site running reliably.</li>
        </ul>
        <p>We do not knowingly collect special-category data, and we do not collect information from children.</p>
      </section>

      <section>
        <h2>How we use your information</h2>
        <p>We use the information you provide to:</p>
        <ul>
          <li>Respond to your enquiries and follow up on requests, including requests for our investor materials;</li>
          <li>Send you the newsletter or updates you have subscribed to;</li>
          <li>Operate, secure, and improve the website.</li>
        </ul>
        <p>
          Our lawful bases for processing under UK data-protection law are your <strong>consent</strong>
          {' '}(which you can withdraw at any time), our <strong>legitimate interests</strong> in
          responding to enquiries and running our business, and, where relevant, taking steps at your
          request before entering into an agreement.
        </p>
      </section>

      <section>
        <h2>Sharing and service providers</h2>
        <p>
          We do not sell your personal information. We share it only with trusted service providers
          who help us operate — for example, our website hosting provider and, where applicable, the
          email-delivery or mailing-list provider that powers our contact and newsletter functions.
          These providers process data on our behalf under appropriate agreements. We may also disclose
          information where required by law.
        </p>
      </section>

      <section>
        <h2>International transfers</h2>
        <p>
          We operate across the United Kingdom, the United Arab Emirates, and Africa, and some of our
          service providers may process data outside the UK. Where personal information is transferred
          internationally, we take steps to ensure it remains protected by appropriate safeguards.
        </p>
      </section>

      <section>
        <h2>Retention</h2>
        <p>
          We keep personal information only for as long as necessary for the purposes described above —
          for example, for the duration of our correspondence with you, or until you unsubscribe from
          the newsletter — after which it is deleted or anonymised.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>
          Subject to applicable law, you have the right to access the personal information we hold
          about you, to ask us to correct or delete it, to object to or restrict certain processing,
          to data portability, and to withdraw consent at any time. To exercise any of these rights,
          email <a href="mailto:divinusblack@gmail.com">divinusblack@gmail.com</a>. You also have the
          right to lodge a complaint with your local data-protection authority (in the UK, the
          Information Commissioner’s Office).
        </p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          This website uses only the cookies and similar technologies necessary for it to function and
          to remain secure. We will update this section if we introduce analytics or marketing cookies
          in future, and will seek your consent where required.
        </p>
      </section>

      <section>
        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. When we do, we will revise the “last updated”
          date at the top of this page. Material changes will be made clear on the website.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about this policy or your personal information can be sent to{' '}
          <a href="mailto:divinusblack@gmail.com">divinusblack@gmail.com</a>.
        </p>
      </section>
    </LegalPage>
  );
}
