import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { APIURLContext } from '../contexts/APIURLContext';

function useDataGetter(dataSource, returnSets, ID) {

    const apiURL = useContext(APIURLContext);
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                if (returnSets == 1) {
                    const response = await axios.get(apiURL + '/' + dataSource + '/' + ID);
                    console.log(apiURL + '/' + dataSource + '/' + ID);
                    setData(() => [...response.data]);
                } else {
                    const response = await axios.get(apiURL + '/' + dataSource + '/' + ID);
                    setData(() => [...response.data.campaigns])
                    setData2(() => [...response.data.donations])
                    setLoading(false);
                }
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }
        setLoading(true);
        loadData();
    }, []);

    return [loading, data, data2];

}

export default useDataGetter;