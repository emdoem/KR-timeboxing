import React, { useEffect, useState } from 'react';

function InspirationalQuote() {
    const [quote, setQuote] = useState(null);

    useEffect(() => {
        import('inspirational-quotes').then(
            (Quote) => {
                setQuote(Quote.getQuote());
            }
        ).catch(() => console.log("Couldn't log qoutes"));
        console.count("Using useEffect!");
    }, []);

    return (
        <>
            {quote
                ? <figure>
                    <blockquote>{quote.text}</blockquote>
                    <figcaption><cite>{quote.author}</cite></figcaption>
                </figure>
                : "..."
            }
        </>



    );
}

export default InspirationalQuote;