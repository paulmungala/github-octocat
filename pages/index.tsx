import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import GithubUser from "../components/GithubUser";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

const Home: NextPage = () => {
    let API = "https://api.github.com/users/octocat";

    const [userName, setUserName] = useState("");
    const userRef = useRef<HTMLInputElement>(null);
    const [data, setData] = useState("");
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (userName) {
            API = `https://api.github.com/users/${userName}`;
        }

        fetch(API)
            .then(res => res.json())
            .then(dataa => {
                console.log(JSON.stringify(dataa));
                setData(dataa);
                setLoading(false);
            });
    }, [userName]);

    if (!data) <p>No Profile data.</p>;
    return (
        <div className="min-h-screen bg-gray-50 py-7 dark:bg-[#1e253f]">
            <Head>
                <title>GitHub User Finder App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />

            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <SearchBar
                        handleClick={() => {
                            if (userRef.current != null) {
                                setUserName(userRef.current?.value);
                            }
                        }}
                        userRef={userRef}
                    />
                    <GithubUser data={data} />
                </>
            )}
        </div>
    );
};

export default Home;
