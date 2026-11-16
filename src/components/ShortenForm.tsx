"use client";

import { useState } from "react";
import styled from "styled-components";
import createLink from "@/lib/createLink";

const Box = styled.form`
    width: 80vw;
    margin: 24px auto;
    background-color: #d7e3f8;
    padding: 16px;
`;

const Field = styled.input`
    display: block;
    width: 100%;
    margin: 8px 0;
    padding: 8px;
    font-size: 16px;
`;

const Button = styled.button`
    background-color: #5a6fa8;
    color: white;
    border: none;
    padding: 8px 16px;
    margin-top: 8px;
`;

const Note = styled.p`
    margin-top: 12px;
`;

const Made = styled.a`
    display: block;
    margin-top: 12px;
    color: blue;
`;

export default function ShortenForm() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [note, setNote] = useState("");
    const [made, setMade] = useState("");

    return (
        <Box
            onSubmit={(event) => {
                event.preventDefault();
                setNote("");
                setMade("");
                createLink(url, alias)
                    .then((message) => {
                        if (message !== "") {
                            setNote(message);
                            return;
                        }
                        // so they can copy the short link
                        setMade(window.location.origin + "/r/" + alias);
                    })
                    .catch((err) => {
                        console.log("could not save link: " + err);
                        setNote("could not save the link");
                    });
            }}
        >
            <label>
                URL
                <Field
                    value={url}
                    placeholder="https://..."
                    onChange={(e) => setUrl(e.target.value)}
                />
            </label>
            <label>
                Alias
                <Field
                    value={alias}
                    placeholder="bu"
                    onChange={(e) => setAlias(e.target.value)}
                />
            </label>
            <Button type="submit" disabled={url === "" || alias === ""}>
                Shorten
            </Button>
            {note !== "" && <Note>{note}</Note>}
            {made !== "" && <Made href={made}>{made}</Made>}
        </Box>
    );
}
