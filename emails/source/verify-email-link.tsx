import React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from '@react-email/components'

export const VerifyEmailViaLink = () => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Verify your email</Preview>
      <Container style={container}>
        <Heading style={h1}>Verify email</Heading>
        <Text style={{ ...text, marginTop: '10px' }}>
          {` Hello, {{ displayName }}`}
        </Text>
        <Text style={{ ...text, marginTop: '10px' }}>
          Thank you for signing up! To complete your registration and verify
          your email address, please use the following verify link
        </Text>
        <Link
          href="{{{link}}}"
          target="_blank"
          style={{
            ...link,
            display: 'block',
            marginBottom: '16px',
          }}
        >
          Verify Now
        </Link>
        <Text
          style={{
            ...text,
            color: '#ababab',
            marginTop: '14px',
            marginBottom: '16px',
          }}
        >
          If you didn&apos;t create an account on our platform, please ignore
          this email or contact our support team if you have any concerns.
        </Text>
        <svg
          width="76"
          height="24"
          viewBox="0 0 1300 410"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 81.6019C0 36.5344 36.5344 0 81.6019 0L328.398 0C373.466 0 410 36.5344 410 81.6019V328.398C410 373.466 373.466 410 328.398 410H81.6019C36.5344 410 0 373.466 0 328.398L0 81.6019Z"
            fill="#F04B4B"
          ></path>
          <path
            d="M890 205C890 91.7816 981.782 0 1095 0V0C1208.22 0 1300 91.7816 1300 205V205C1300 318.218 1208.22 410 1095 410V410C981.782 410 890 318.218 890 205V205Z"
            fill="#1AD7B5"
          ></path>
          <path
            d="M734.17 369.372C702.095 423.543 621.905 423.543 589.83 369.372L443.289 121.885C411.213 67.714 451.308 4.87422e-05 515.459 4.31339e-05L808.541 1.75119e-05C872.692 1.19036e-05 912.787 67.714 880.711 121.885L734.17 369.372Z"
            fill="#FBB03B"
          ></path>
        </svg>
        <Text style={footer}>
          <Link
            href="https://notion.so"
            target="_blank"
            style={{ ...link, color: '#898989' }}
          >
            dvith.com
          </Link>
          , the example service
          <br />
          for your notes, tasks, wikis, and databases.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default VerifyEmailViaLink

const main = {
  backgroundColor: '#ffffff',
}

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
}

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
}

const link = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline',
}

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
}

const footer = {
  color: '#898989',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '12px',
  marginBottom: '24px',
}
