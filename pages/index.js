import { useRouter } from 'next/router'
import Head from 'next/head'
import Container from '../components/Container'
import { useSession } from "next-auth/react"
import Loader from '../components/Loader'


export default function Home() {


  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  if (status === "loading") {
    return <Loader />;
  }


  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container />

    </div>
  )
}
