import LegalPage from '../components/LegalPage';

export const metadata = {
  title: 'Terms of Use — Divinus Investment Group',
  description: 'The terms governing your use of the Divinus Investment Group website.',
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Use"
      lastUpdated="3 June 2026"
      lede="These terms govern your use of this website. By accessing or using the site, you agree to them."
    >
      <section>
        <h2>About these terms</h2>
        <p>
          This website is operated by <strong>Divinus Investment Group Limited</strong>, a company
          registered in England &amp; Wales (“Divinus”, “we”, “us”). By accessing or using this
          website, you agree to these Terms of Use. If you do not agree, please do not use the site.
        </p>
      </section>

      <section>
        <h2>Use of the website</h2>
        <p>
          You may use this website for lawful, personal, and informational purposes only. You agree
          not to misuse the site — including attempting to gain unauthorised access, interfering with
          its operation or security, scraping or harvesting data, or using it in any way that breaches
          applicable law or the rights of others.
        </p>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>
          All content on this website — including text, design, graphics, the Divinus name and marks,
          and the layout — is owned by or licensed to Divinus and is protected by intellectual-property
          law. You may not copy, reproduce, distribute, or create derivative works from any part of the
          site without our prior written permission.
        </p>
      </section>

      <section>
        <h2>No financial advice</h2>
        <p>
          The information on this website is provided for general information only. <strong>Divinus
          Capital is a financial education division. We do not provide regulated financial advice,
          manage client funds, or make investment recommendations.</strong> Nothing on this website
          constitutes financial, investment, legal, or tax advice, nor an offer or solicitation to buy
          or sell any security or financial product. Any investor materials referenced on this site are
          provided on a confidential basis to named recipients and do not constitute a public offer of
          securities. You should obtain independent professional advice before making any decision.
        </p>
      </section>

      <section>
        <h2>External links</h2>
        <p>
          This website may contain links to third-party websites and resources. We provide these for
          convenience only and are not responsible for the content, accuracy, or practices of any
          external site. Following such links is at your own risk.
        </p>
      </section>

      <section>
        <h2>Disclaimer and limitation of liability</h2>
        <p>
          The website is provided on an “as is” and “as available” basis. While we work to keep its
          content accurate and up to date, we make no warranties of any kind as to its completeness or
          reliability. To the fullest extent permitted by law, Divinus will not be liable for any loss
          or damage arising from your use of, or inability to use, this website. Nothing in these terms
          limits any liability that cannot be limited under applicable law.
        </p>
      </section>

      <section>
        <h2>Privacy</h2>
        <p>
          Your use of this website is also governed by our <a href="/privacy">Privacy Policy</a>, which
          explains how we handle personal information.
        </p>
      </section>

      <section>
        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of England &amp; Wales, and any disputes relating to them
          or to your use of the website are subject to the exclusive jurisdiction of the courts of
          England &amp; Wales.
        </p>
      </section>

      <section>
        <h2>Changes to these terms</h2>
        <p>
          We may update these terms from time to time. The “last updated” date at the top of this page
          reflects the most recent version. Your continued use of the website after any change
          constitutes acceptance of the revised terms.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to{' '}
          <a href="mailto:divinusblack@gmail.com">divinusblack@gmail.com</a>.
        </p>
      </section>
    </LegalPage>
  );
}
