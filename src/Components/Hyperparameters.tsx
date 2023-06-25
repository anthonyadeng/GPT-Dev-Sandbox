import { ReactNode, useEffect } from 'react';
import Dropdown from './Dropdown';

const hyper: {
    [key: string]: string[];
} = {
    models_hyper: ['ada', 'babbage', 'curie', 'davinci'],
    n_epochs: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Default'],
    batch_size: Array.from(Array(256).keys())
        .map((x) => x.toString())
        .concat(['Default']),
    learning_rate_multiplier: Array.from(Array(20).keys())
        .slice(1)
        .map((x) => (x / 100).toString())
        .concat(['Default']),
    compute_classification_metrics: ['true', 'false', 'Default'],
};

export default function Hyperparameters() {
    const dropdowns: React.ReactElement[] = [];
    useEffect(() => {
        Object.keys(hyper).forEach((key) => {
            dropdowns.push(<Dropdown opts={hyper[key]} width={300} id={key} />);
        });
    });

    return <div>{dropdowns}</div>;
}
