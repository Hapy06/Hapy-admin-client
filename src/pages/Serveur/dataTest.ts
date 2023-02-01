import {Order} from "../../globals/models/models";

export const listZoneResponseTest = {
    data: {
        items: [
            {
                name: "Terasse droite",
                tableNumStart: 1,
                tableNumEnd: 8,
                tableIds: [
                    {
                        tableNumber: 1,
                        quantity: 10,
                        codeQrUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOUSURBVO3BQY5jiRUDweSD7n/ldC+84OoDglQ17jEj4h/M/NcxU46ZcsyUY6YcM+WYKcdMOWbKMVOOmXLMlGOmHDPlmCnHTHnxoST8JpVvSkJTaUloKu9Iwm9S+cQxU46ZcsyUF1+m8k1J+EQSnqi0JDSVloQnKk9UvikJ33TMlGOmHDPlxQ9LwjtU3pGEJyrvUGlJaCrflIR3qPykY6YcM+WYKS/+5ZLQVFoSnqi0JDSVf5Njphwz5ZgpL/5lVFoSnqg8SUJTaUloKn+zY6YcM+WYKS9+mMrfJAlNpSWhqXxC5X/JMVOOmXLMlBdfloS/SRKaSktCU2lJaCpPkvC/7Jgpx0w5ZsqLD6n8TZLwDpVPqPxNjplyzJRjpsQ/+EASmkpLwjepfFMSPqHyJAnfpPKTjplyzJRjpsQ/+KIkPFFpSWgq35SEpvJNSXii8o4kNJWWhKbyTcdMOWbKMVNefCgJ70jCO5LQVJ4koam0JDSVdyShqTxJQlN5otKS0FRaEprKJ46ZcsyUY6a8+JBKS0JTaUloKi0JTaUloak0lW9KwjuS0FRaEprKE5UnKt90zJRjphwzJf7BPygJ71B5RxKaSkvCE5UnSXiHSkvCN6l84pgpx0w5ZsqLDyXhiUpLwjtUniThico7VFoSmkpTeUcSmkpLQlNpSWgq33TMlGOmHDPlxZeptCQ0lZaEptKS8ETlNyXhiUpLwjtUnqi0JDSVTxwz5Zgpx0x58cuS8CQJTaUloSWhqTxJwjtU3pGETyShqTxR+aZjphwz5ZgpL36ZypMktCQ0lSdJeKLSktCS8JuS0FRaEppKS0JT+cQxU46ZcsyU+Ad/sSQ0lSdJeKLyjiQ0lXckoan8k46ZcsyUY6a8+FASfpNKU2lJeKLyjiQ0lXckoak8SUJTeZKEpvKJY6YcM+WYKS++TOWbkvAkCU2lJeFJEprKkyS8Q+UnqXzTMVOOmXLMlBc/LAnvUPknJeETSfiESktCU/lJx0w5ZsoxU178y6m0JDSVdyShqbQkPFFpSWhJaCotCU9UPnHMlGOmHDPlxf8ZlZaETyShqTxJQlNpSXii0pLwTcdMOWbKMVNe/DCVn6TyJAlNpal8IgktCX+zY6YcM+WYKS++LAm/KQlPVJ4k4RMq36TSkvCbjplyzJRjpsQ/mPmvY6YcM+WYKcdMOWbKMVOOmXLMlGOmHDPlmCnHTDlmyjFTjpnyH0i/mRX/1WVtAAAAAElFTkSuQmCC",
                        isOpen: false,
                        isFree: false,
                        isOrderValidationWaiting: false,
                        isOrderInCooking: false,
                        isOrderReady: false,
                        isTableValidated: false,
                        createdAt: "2022-12-22T07:06:21.917Z",
                        updatedAt: "2022-12-22T07:06:22.294Z",
                        id: "63a401ed3af838fc32a4efda"
                    },
                    {
                        tableNumber: 2,
                        quantity: 10,
                        codeQrUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOcSURBVO3BQY7cWgIDQeZD3f/KOb2YBVcCBKna3wYj8Edm/u9kppzMlJOZcjJTTmbKyUw5mSknM+VkppzMlJOZcjJTTmbKyUw5mSmfPATkN6m5A8gdahqQpuYOIL9JzRMnM+VkppzMlE9epuZNQO4A8gSQpqYBuaLmipo3AXnTyUw5mSknM+WTLwNyh5o7gDQ1dwBpahqQpuZNQO5Q800nM+VkppzMlE/+MUCuqLkCpKlpQJqaf8nJTDmZKScz5ZN/jJon1DQgTU0D0tT8zU5myslMOZkpn3yZmt8EpKm5oqYBaWoakKbmCTX/JScz5WSmnMyUT14G5E9S04A0NQ1IU9OANDUNSFNzBch/2clMOZkpJzPlk4fU/JcAuQLkDjVPqPmbnMyUk5lyMlM+eQhIU9OAvElNU/MmIHeouQLkTWq+6WSmnMyUk5mCP/IiIE1NA9LUNCBNTQPS1FwB0tS8CcgVNXcAaWoakKbmTScz5WSmnMwU/JEXAbmipgG5Q00D0tTcAaSpuQKkqbkC5IqaK0CamgakqXniZKaczJSTmfLJQ0CamgakAWlq7gByB5Cm5g4gdwBpahqQO9RcUfOmk5lyMlNOZgr+yB8EpKlpQO5QcweQK2quALlDTQPyJjVPnMyUk5lyMlPwRx4A0tQ0IE3NFSBNTQNyh5orQJqaBqSpeQJIU9OANDUNSFPzppOZcjJTTmbKJ1+mpgG5A8gVNb8JyBU1Dcgdaq6oaUCamidOZsrJTDmZKZ98GZCmpgFpar4JyB1q7gDyBJCm5oqaN53MlJOZcjJTPvnD1DQgV9Q0IE3NFTUNSAPym4A0NQ1IU9OANDVPnMyUk5lyMlPwR/5iQK6oaUCuqLkDSFNzB5Cm5k86mSknM+VkpnzyEJDfpKapuUPNHUCamjuANDVXgDQ1V4A0NU+czJSTmXIyUz55mZo3AbkCpKlpQO5QcwXIHWq+Sc2bTmbKyUw5mSmffBmQO9S8Sc0VIA3IE0CeUNOANDXfdDJTTmbKyUz55B8H5IqaO4A0NQ3IFTUNSAPS1DQgV9Q8cTJTTmbKyUz55B8D5IqaBuQJIE3NFSBNTQNyRU0D8qaTmXIyU05myidfpuab1DQgd6h5AkgD8jc7mSknM+VkpnzyMiC/CcgTQJ5Q8yY1DchvOpkpJzPlZKbgj8z838lMOZkpJzPlZKaczJSTmXIyU05myslMOZkpJzPlZKaczJSTmXIyU/4HQiWaGnLfU28AAAAASUVORK5CYII=",
                        isOpen: false,
                        isFree: false,
                        isOrderValidationWaiting: false,
                        isOrderInCooking: false,
                        isOrderReady: false,
                        isTableValidated: false,
                        createdAt: "2022-12-22T07:06:22.111Z",
                        updatedAt: "2022-12-22T07:06:22.585Z",
                        id: "63a401ee3af838fc32a4efdc"
                    },
                    {
                        tableNumber: 3,
                        quantity: 10,
                        codeQrUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOMSURBVO3BQY7sVgIDweRD3f/KOb3wgrMRIEjV/rYZEX8w85fDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNM+fBQEn6TypUkNJWWhKZyJQlN5Y4k/CaVJw4z5TBTDjPlw8tU3pSEO1TuSMIVlZaEKypXVN6UhDcdZsphphxmyocvS8IdKnck4QmVK0loKm9Kwh0q33SYKYeZcpgpH/7lVK4k4YpKS0JT+Tc5zJTDTDnMlA/zf1RaEppKS0JT+Sc7zJTDTDnMlA9fpvInScKVJDSVloSm8oTKn+QwUw4z5TBTPrwsCX8nlZaEptKS0FRaEppKS0JTuZKEP9lhphxmymGmfHhI5U+m0pJwh8oTKv8kh5lymCmHmRJ/8EASmkpLwptUriShqdyRhDtUriThTSrfdJgph5lymCnxB78oCU2lJaGptCQ0lZaEO1SeSMIVlTuS0FRaEprKmw4z5TBTDjPlw0NJuKLyRBKuJKGptCQ0lZaEpnIlCU3lShKuqDSVloSm0pLQVJ44zJTDTDnMlA9floSmcofKEypPJOGOJDSVloQ7VK6ovOkwUw4z5TBT4g9elISmciUJT6i0JDSVloQ7VK4k4Q6VloQ3qTxxmCmHmXKYKfEHDyThDpXflISm0pLQVFoSmsoTSWgqLQlNpSWhqbzpMFMOM+UwUz68TOWJJFxRaUloKt+UhCsqLQl3qFxRaUloKk8cZsphphxmyocvS0JTuUPlTUm4Q+WOJDyRhKZyReVNh5lymCmHmRJ/8EASmsqVJDSVloQrKleScEWlJeFPotKS0FRaEprKE4eZcpgph5kSf/APloSmciUJV1TuSEJTuSMJTeXvdJgph5lymCkfHkrCb1JpKneotCRcSUJTuSMJTeVKEprKlSQ0lScOM+UwUw4z5cPLVN6UhCtJaCpXktBU7kjCHSrfpPKmw0w5zJTDTPnwZUm4Q+WJJFxRaUl4UxKeUGlJaCrfdJgph5lymCkf/mOS0FTuSEJTaUm4otKS0JLQVFoSrqg8cZgph5lymCkf/mNUWhKeSEJTuZKEptKScEWlJeFNh5lymCmHmfLhy1S+SeUJlSeS0JLwT3aYKYeZcpgpH16WhN+UhCsqV5LwhMqbVFoSftNhphxmymGmxB/M/OUwUw4z5TBTDjPlMFMOM+UwUw4z5TBTDjPlMFMOM+UwUw4z5TBT/gd0DJ34jMhf9QAAAABJRU5ErkJggg==",
                        isOpen: false,
                        isFree: false,
                        isOrderValidationWaiting: false,
                        isOrderInCooking: false,
                        isOrderReady: false,
                        isTableValidated: false,
                        createdAt: "2022-12-22T07:06:22.294Z",
                        updatedAt: "2022-12-22T07:06:22.771Z",
                        id: "63a401ee3af838fc32a4efdf"
                    },
                    {
                        tableNumber: 4,
                        quantity: 10,
                        codeQrUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOdSURBVO3BQW7dWAIEwayHf/8r52jRi1oRIEjJsqci4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSuJKGp3JGEn6TyxGGmHGbKYaZ8eJnKm5LwRBKaypUkNJWWhCsqV1TelIQ3HWbKYaYcZsqHb5aEO1TuSMKbVFoSmsqbknCHync6zJTDTDnMlA//GJU7knBFpSWhqfxLDjPlMFMOM+XDPyYJTaUloalcSUJTaUloKn+zw0w5zJTDTPnwzVR+E5WWhCsqLQlN5QmV3+QwUw4z5TBTPrwsCX+SSktCU7mi0pLQVFoSmsqVJPxmh5lymCmHmfLhIZXfJAl3qFxReULlb3KYKYeZcpgpHx5KQlNpSXiTSlNpSWgqLQlNpSXhDpUrSXiTync6zJTDTDnMlA8vS0JTaUloKnck4YrKFZWWhKZyRxKuqNyRhKbSktBU3nSYKYeZcpgp8QsPJOFNKi0JTeWOJDSVJ5LQVK4k4YrKlSQ0lZaEpvLEYaYcZsphpnx4SOVKEprKHSotCU2lJeFNSbgjCU2lJeEOlSsqbzrMlMNMOcyU+IU/KAlNpSWhqdyRhCdUriThDpWWhDepPHGYKYeZcpgp8QsPJKGpXEnCFZUrSWgqTyShqbQkNJUnktBUWhKaSktCU3nTYaYcZsphpnz4ZkloKi0JLQlXVFoSmkpLQlN5IglXVFoS7lC5otKS0FSeOMyUw0w5zJQPv4zKE0m4koQ7VO5IwhNJaCpXVN50mCmHmXKYKR++mUpLQlNpSXhCpSWhqbQktCT8pCQ0lZaEptKS0FSeOMyUw0w5zJT4hb9YEprKlSRcUbkjCU3ljiQ0lT/pMFMOM+UwUz48lISfpNJU7lC5IwlN5Y4kNJUrSWgqV5LQVJ44zJTDTDnMlA8vU3lTEq4k4YpKS8IVlStJuEPlO6m86TBTDjPlMFM+fLMk3KHypiQ0lStJeCIJT6i0JDSV73SYKYeZcpgpH/5xKi0JV1SuJKGptCRcUWlJaEloKi0JV1SeOMyUw0w5zJQP/2dUriThjiQ0lStJaCotCVdUWhLedJgph5lymCkfvpnKd1JpSXhC5Y4ktCT8zQ4z5TBTDjPlw8uS8JOS0FTuSMITKm9SaUn4SYeZcpgph5kSvzDzn8NMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0z5H0dapQmk2dXbAAAAAElFTkSuQmCC",
                        isOpen: false,
                        isFree: false,
                        isOrderValidationWaiting: false,
                        isOrderInCooking: false,
                        isOrderReady: false,
                        isTableValidated: false,
                        createdAt: "2022-12-22T07:06:22.585Z",
                        updatedAt: "2022-12-22T07:06:22.955Z",
                        id: "63a401ee3af838fc32a4efe3"
                    },
                    {
                        tableNumber: 5,
                        quantity: 10,
                        codeQrUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOWSURBVO3BQY7cWgIDweSD7n/lHC/+gisBgqrstocR8Rdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpFy8l4XdSuZOEOyotCU2lJaGpPJGE30nljcNMOcyUw0y5+DCVT0rCEyotCS0JTaUloam0JNxRuaPySUn4pMNMOcyUw0y5+LIkPKHyRBKaSlN5QqUloal8UhKeUPmmw0w5zJTDTLn4xyShqbQkNJWWhKbSktBU/iWHmXKYKYeZcvGPS0JTuaPSktBUWhKayt/sMFMOM+UwUy6+TOUnScITKi0JTeUNlZ/kMFMOM+UwUy4+LAl/kkpLQlNpSWgqLQlNpSWhqdxJwk92mCmHmXKYKRcvqfwkSbiThCdU3lD5mxxmymGmHGbKxUtJaCotCZ+k0lQ+KQlPqNxJwiepfNNhphxmymGmXLyk8oRKS0JTeSIJTaUloam0JDSVJ5JwR+WJJDSVloSm8kmHmXKYKYeZcvFSEppKU3kiCXdUnlBpSWgqTyShqdxJwh2VptKS0FRaEprKG4eZcpgph5ly8cOo3EnCE0l4IwlPJKGptCQ8oXJH5ZMOM+UwUw4z5eLDkvCESkvCEyotCU3lThLuqNxJwp0kNJWWhE9SeeMwUw4z5TBTLv6wJNxRaUloSWgqb6i0JDSVpvJEEppKS0JTaUloKp90mCmHmXKYKRcfpvJGEloSfpIk3FFpSXhC5Y5KS0JTeeMwUw4z5TBTLr4sCW+ovJGEN1SeSMIbSWgqd1Q+6TBTDjPlMFMuvkylJaGp3EnCJ6m0JLQk/E5JaCotCU2lJaGpvHGYKYeZcpgp8Rf+Ykm4o9KScEfliSQ0lSeS0FT+pMNMOcyUw0y5eCkJv5NKU2lJuKPyRBKayhNJaCp3ktBU7iShqbxxmCmHmXKYKRcfpvJJSbiThKbSknBH5YkkPKHyTSqfdJgph5lymCkXX5aEJ1TeSMIdlTtJeCMJb6i0JDSVbzrMlMNMOcyUi3+cSkvCHZU7SWgqLQl3VFoSWhKaSkvCHZU3DjPlMFMOM+Xi/4zKnSQ8kYSmcicJTaUl4Y5KS8InHWbKYaYcZsrFl6l8k0pLQktCU7mj8kQSWhL+ZoeZcpgph5ly8WFJ+J2S8EYS3lD5JJWWhN/pMFMOM+UwU+IvzPznMFMOM+UwUw4z5TBTDjPlMFMOM+UwUw4z5TBTDjPlMFMOM+UwU/4HismTJBZy2BYAAAAASUVORK5CYII=",
                        isOpen: false,
                        isFree: false,
                        isOrderValidationWaiting: false,
                        isOrderInCooking: false,
                        isOrderReady: false,
                        isTableValidated: false,
                        createdAt: "2022-12-22T07:06:22.771Z",
                        updatedAt: "2022-12-22T07:06:23.129Z",
                        id: "63a401ee3af838fc32a4efe7"
                    },
                    {
                        tableNumber: 6,
                        quantity: 10,
                        codeQrUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOWSURBVO3BQa7cVgADwebD3P/KHS+yYDYCBGl+bINV8Rdm/nWYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEpnIlCU2lJaGp3JGEn6TyxGGmHGbKYaZ8eJnKm5LwTSotCU2lJeGKyhWVNyXhTYeZcpgph5ny4cuScIfKHUloKnckoam0JDSVNyXhDpVvOsyUw0w5zJQP8x9JaCotCU3lb3KYKYeZcpgpH/4ySWgqLQlN5UoSmkpLQlP5kx1mymGmHGbKhy9T+UkqV1RaEq6otCQ0lSdUfieHmXKYKYeZ8uFlSfidJKGpXFFpSWgqLQlN5UoSfmeHmXKYKYeZ8uEhld+ZSktCU7mi8oTKn+QwUw4z5TBT4i88kISm0pLwJpUrSfhJKleS8CaVbzrMlMNMOcyU+Av/oyRcUbmShKbSktBU3pSEKyp3JKGptCQ0lTcdZsphphxmyoeHktBUriShqbQktCS8KQlN5Y4kNJUrSbii0lRaEppKS0JTeeIwUw4z5TBTPjyk0pJwRxKaypUkPKFyRxLuSEJTaUm4Q+WKypsOM+UwUw4z5cNDSWgqLQlN5Y4kXFFpSbgjCVdUriThShKaSkvCm1SeOMyUw0w5zJQPX6ZyJQlXVFoSWhKaSkvCHSotCU2lqdyRhKbSktBUWhKaypsOM+UwUw4z5cOXJaGpNJUrSXhC5U1JuKLSknCHyhWVloSm8sRhphxmymGmfPhhSWgqLQlN5UoSWhLepHJHEp5IQlO5ovKmw0w5zJTDTPnwZSotCXck4YrKE0loSfhJSWgqLQlNpSWhqTxxmCmHmXKYKfEX/mBJaCotCXeo3JGEpnJHEprK/+kwUw4z5TBTPjyUhJ+k0lRaEq6otCRcSUJTuSMJTeVKEprKlSQ0lScOM+UwUw4z5cPLVN6UhCtJuCMJTyThDpVvUnnTYaYcZsphpnz4siTcofKEyh1JaEl4IglPqLQkNJVvOsyUw0w5zJQPf7kkXFG5IwlNpSXhikpLQktCU2lJuKLyxGGmHGbKYaZ8+Mup3JGEO5LQVK4koam0JFxRaUl402GmHGbKYaZ8+DKVb1K5koSmckXljiS0JPzJDjPlMFMOM+XDy5Lwk5LQVO5IwhMqb1JpSfhJh5lymCmHmRJ/YeZfh5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmfIPBLCPKBlal7EAAAAASUVORK5CYII=",
                        isOpen: false,
                        isFree: false,
                        isOrderValidationWaiting: false,
                        isOrderInCooking: false,
                        isOrderReady: false,
                        isTableValidated: false,
                        createdAt: "2022-12-22T07:06:22.955Z",
                        updatedAt: "2022-12-22T07:06:23.302Z",
                        id: "63a401ee3af838fc32a4efeb"
                    },
                    {
                        tableNumber: 7,
                        quantity: 10,
                        codeQrUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOBSURBVO3BQY7kwAEDwWSh///l9Bx84EmAIPV4d82I+IOZ/zrMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUDw8l4Tep/KYkNJU7kvCbVJ44zJTDTDnMlA8vU3lTEp5IwhMqLQlXVK6ovCkJbzrMlMNMOcyUD1+WhDtU7kjCFZWWhCsqLQlN5U1JuEPlmw4z5TBTDjPlwz9G5YrKlSQ0lZaEpvIvOcyUw0w5zJQP/5gkNJUrSWgqLQlNpSWhqfzNDjPlMFMOM+XDl6n8JpU7VFoSmkpLQlN5QuVPcpgph5lymCkfXpaEP0kSmkpLQlNpSWgqLQlN5UoS/mSHmXKYKYeZ8uEhlX+ZyhMqf5PDTDnMlMNMiT94IAlNpSXhTSrflIQ7VK4k4U0q33SYKYeZcpgpH16WhCsqb0pCU7mShCsqdyThisodSWgqLQlN5U2HmXKYKYeZEn/wRUm4otKS8CaVK0loKleS0FSuJKGptCQ0lZaEptKS0FSeOMyUw0w5zJQPL0vCEypXkvCbknBHEppKS0JTuaJyReVNh5lymCmHmRJ/8IuS0FSuJOEOlZaEJ1SuJOEOlZaEN6k8cZgph5lymCnxBw8koanckYQrKleS0FTuSEJTaUloKk8koam0JDSVloSm8qbDTDnMlMNM+fCHS8IdSWgqb0rCFZWWhDtUrqi0JDSVJw4z5TBTDjPlw5cloak0lSeS0FRaEp5QuSMJTyShqVxRedNhphxmymGmxB88kISmckcSmkpLQlO5koQrKi0JfxKVloSm0pLQVJ44zJTDTDnMlPiDv1gSmsqVJFxRuSMJTeWOJDSV/6XDTDnMlMNM+fBQEn6TSlO5Q6Ul4UoSmsodSWgqV5LQVK4koak8cZgph5lymCkfXqbypiRcSUJTaUm4onJHEu5Q+SaVNx1mymGmHGbKhy9Lwh0qTyThikpLwpuS8IRKS0JT+abDTDnMlMNM+fB/JglN5Y4kNJWWhCsqLQktCU2lJeGKyhOHmXKYKYeZ8uEfp3JHEu5IQlO5koSm0pJwRaUl4U2HmXKYKYeZ8uHLVL5JpSXhCZU7ktCS8Dc7zJTDTDnMlA8vS8JvSkJTuSMJT6i8SaUl4TcdZsphphxmSvzBzH8dZsphphxmymGmHGbKYaYcZsphphxmymGmHGbKYaYcZsphphxmyn8A+f2PBOfmeOAAAAAASUVORK5CYII=",
                        isOpen: false,
                        isFree: false,
                        isOrderValidationWaiting: false,
                        isOrderInCooking: false,
                        isOrderReady: false,
                        isTableValidated: false,
                        createdAt: "2022-12-22T07:06:23.126Z",
                        updatedAt: "2022-12-22T07:06:23.483Z",
                        id: "63a401ef3af838fc32a4efef"
                    },
                    {
                        tableNumber: 8,
                        quantity: 10,
                        codeQrUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOYSURBVO3BQW7lVgADwebDv/+VO15kwZUAQbLjmbAqfmHmX4eZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgph5ny4aEk/CSVO5Jwh0pLQlO5Iwk/SeWJw0w5zJTDTPnwMpU3JeGOJDSVloQrSWgqLQlXVK6ovCkJbzrMlMNMOcyUD98sCXeo3JGEJ1SuJKGpvCkJd6h8p8NMOcyUw0z58JdReSIJTaUloan8TQ4z5TBTDjPlw/+MyhWVloSm0pLQVP5kh5lymCmHmfLhm6n8l5LQVK4koam0JDSVJ1R+k8NMOcyUw0z58LIk/EmS0FRaEppKS0JTuZKE3+wwUw4z5TBTPjyk8puptCTcofKEyp/kMFMOM+UwUz48lISm0pLwJpWm0pJwh0pLwh0qV5LwJpXvdJgph5lymCnxCz8oCVdU7khCU2lJuEPljiRcUbkjCU2lJaGpvOkwUw4z5TBTPvwwlTuS0FTuUHlTEprKlSQ0lZaEptKS0FRaEprKE4eZcpgph5ny4WVJaCp3JKGptCQ0lZaEJ1RaEu5IQlNpSWgqV1SuqLzpMFMOM+UwU+IXvlESrqi0JFxRuZKEpnIlCVdUriThDpWWhDepPHGYKYeZcpgp8QsPJKGpXEnCHSotCVdU7khCU2lJaCpPJKGptCQ0lZaEpvKmw0w5zJTDTPnwzZLQVFoSmkpLQlO5koSm8qYkXFFpSbhD5YpKS0JTeeIwUw4z5TBTPvxyKleS0FRaEp5QuSMJTyShqVxRedNhphxmymGmxC88kISmciUJT6hcScIVlZaE30SlJaGptCQ0lScOM+UwUw4zJX7hD5aEKyotCVdU7khCU7kjCU3lv3SYKYeZcpgpHx5Kwk9SaSp3qNyRhKZyRxKaypUkNJUrSWgqTxxmymGmHGbKh5epvCkJV5JwRaUl4YrKlSTcofKdVN50mCmHmXKYKR++WRLuUHlTEprKlSQ8kYQnVFoSmsp3OsyUw0w5zJQPfxmVloSWhCsqV5LQVFoSrqi0JLQkNJWWhCsqTxxmymGmHGbKh79MEprKlSS0JNyRhKZyJQlNpSXhikpLwpsOM+UwUw4z5cM3U/lOKi0JLQlXVJ5IQkvCn+wwUw4z5TBTPrwsCT8pCXeotCQ8ofImlZaEn3SYKYeZcpgp8Qsz/zrMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUfwD7a6AISPuyWwAAAABJRU5ErkJggg==",
                        isOpen: false,
                        isFree: false,
                        isOrderValidationWaiting: false,
                        isOrderInCooking: false,
                        isOrderReady: false,
                        isTableValidated: false,
                        createdAt: "2022-12-22T07:06:23.302Z",
                        updatedAt: "2022-12-22T07:06:23.652Z",
                        id: "63a401ef3af838fc32a4eff3"
                    }
                ],
                createdAt: "2022-12-22T07:11:10.687Z",
                updatedAt: "2022-12-22T07:11:12.423Z",
                id: "63a4030e3af838fc32a4f006"
            }
        ],
        perPage: 12,
        totalElements: 5,
        currentPage: 1,
        hasPreviousPage: false,
        previousPage: 0,
        hasNextPage: false,
        nextPage: 2,
        totalPages: 1
    },
    message: "zone successfully found.",
    success: true
} ;

export const allOrders:Order[] = [
    {
        id:'4865464dfvdhvkhdfk',
        institutionId: "63c55a736bc6def4ca70ba89",
        tableId: "63c561ee46bc59e51dc4ac72",
        tableNumber: 30,
        tableZoneName: "EFFS554465445",
        isFoodReady: false,
        totalCost: 675,
        coupons: [
            {
                insitutionID: "63c55a736bc6def4ca70ba89",
                tableID: "63c561ee46bc59e51dc4ac72",
                tableNumber: 30,
                tableZoneName: "EFFS554465445",
                product: {
                    name: "Salade",
                    hapyHour: false,
                    cookingStation: "Cuisine",
                    institution: "63c55a736bc6def4ca70ba89",
                    createdAt: "2023-01-21T08:00:26.312Z",
                    updatedAt: "2023-01-21T08:00:26.312Z",
                    id: "63cb9b9a9fd3dfb4c0cadbd3"
                },
                productVariant: {
                    picture: "picture-1674228179962-244426488.jpeg",
                    name: "Salade grecque",
                    sellingPrice: 325,
                    crossedOutPrice: 450,
                    description: "Salade dans sa variante grecque",
                    allergene: "Animal proteins, animal dander, Dust, Drugs",
                    createdAt: "2023-01-20T15:22:59.975Z",
                    updatedAt: "2023-01-20T15:22:59.975Z",
                    id: "63cab1d3d476170206f626d7"
                },
                isPregnant: true,

                price: 325,
                ingredientsModifiablesStates: [],
                cookingStation: "Cuisine"
            },
            {
                insitutionID: "63c55a736bc6def4ca70ba89",
                tableID: "63c561ee46bc59e51dc4ac72",
                tableNumber: 30,
                tableZoneName: "EFFS554465445",
                product: {
                    name: "Salade",
                    hapyHour: false,
                    cookingStation: "Cuisine",
                    institution: "63c55a736bc6def4ca70ba89",
                    createdAt: "2023-01-21T08:00:26.312Z",
                    updatedAt: "2023-01-21T08:00:26.312Z",
                    id: "63cb9b9a9fd3dfb4c0cadbd3"
                },
                productVariant: {
                    picture: "picture-1674227738743-332052949.jpeg",
                    name: "La Cocotte",
                    sellingPrice: 350,
                    crossedOutPrice: 450,
                    description: "Salade dans sa variante cocotte",
                    allergene: "Animal proteins, animal dander, Dust, Drugs",
                    createdAt: "2023-01-20T15:15:38.757Z",
                    updatedAt: "2023-01-20T15:15:38.757Z",
                    id: "63cab01a952ed3ce8deaa99a"
                },
                isPregnant: false,

                price: 350,
                ingredientsModifiablesStates: [],
                cookingStation: "Cuisine"
            }
        ],
        notificationID: "OIJF654654644JLFL"
    },
    {
        id:'dgv5d45d4vd4f554df',
        institutionId: "63c55a736bc6def4ca70ba89",
        tableId: "63c561ee46bc59e51dc4ac72",
        tableNumber: 30,
        tableZoneName: "EFFS554465445",
        isFoodReady: false,
        totalCost: 325,
        coupons: [
            {
                insitutionID: "63c55a736bc6def4ca70ba89",
                tableID: "63c561ee46bc59e51dc4ac72",
                tableNumber: 30,
                tableZoneName: "EFFS554465445",
                product: {
                    name: "Salade",
                    hapyHour: false,
                    cookingStation: "Cuisine",
                    institution: "63c55a736bc6def4ca70ba89",
                    createdAt: "2023-01-21T08:00:26.312Z",
                    updatedAt: "2023-01-21T08:00:26.312Z",
                    id: "63cb9b9a9fd3dfb4c0cadbd3"
                },
                productVariant: {
                    picture: "picture-1674228080975-217726896.jpeg",
                    name: "Salade grecque",
                    sellingPrice: 325,
                    crossedOutPrice: 450,
                    description: "Salade dans sa variante grecque",
                    allergene: "Animal proteins, animal dander, Dust, Drugs",
                    createdAt: "2023-01-20T15:21:20.985Z",
                    updatedAt: "2023-01-20T15:21:20.985Z",
                    id: "63cab170ed584f2a31ccfcbd"
                },
                isPregnant: false,

                price: 325,
                ingredientsModifiablesStates: [],
                cookingStation: "Cuisine"
            }
        ],
        notificationID: "EDFDD456546664DDDDD"
    },

    {
        id:'87rgdefvdfvdfv787898798',
        institutionId: "63c55a736bc6def4ca70ba89",
        tableId: "63c561ee46bc59e51dc4ac72",
        tableNumber: 30,
        tableZoneName: "EFFS554465445",
        isFoodReady: false,
        totalCost: 875,
        coupons: [
            {
                insitutionID: "63c55a736bc6def4ca70ba89",
                tableID: "63c561ee46bc59e51dc4ac72",
                tableNumber: 30,
                tableZoneName: "EFFS554465445",
                product: {
                    name: "Salade",
                    hapyHour: false,
                    cookingStation: "Cuisine",
                    institution: "63c55a736bc6def4ca70ba89",
                    createdAt: "2023-01-21T08:00:26.312Z",
                    updatedAt: "2023-01-21T08:00:26.312Z",
                    id: "63cb9b9a9fd3dfb4c0cadbd3"
                },
                productVariant: {
                    picture: "picture-1674227405805-871177117.jpg",
                    name: "Salade tunisienne",
                    sellingPrice: 200,
                    crossedOutPrice: 275,
                    description: "Salade dans sa variante tunisienne",
                    allergene: "Animal proteins, animal dander, Dust, Drugs",
                    createdAt: "2023-01-20T15:10:05.816Z",
                    updatedAt: "2023-01-20T15:10:05.816Z",
                    id: "63caaecd46e8d769c9235195"
                },
                isPregnant: false,

                price: 200,
                ingredientsModifiablesStates: [],
                cookingStation: "Cuisine"
            },
            {
                insitutionID: "63c55a736bc6def4ca70ba89",
                tableID: "63c561ee46bc59e51dc4ac72",
                tableNumber: 30,
                tableZoneName: "EFFS554465445",
                product: {
                    name: "Salade",
                    hapyHour: false,
                    cookingStation: "Cuisine",
                    institution: "63c55a736bc6def4ca70ba89",
                    createdAt: "2023-01-21T08:00:26.312Z",
                    updatedAt: "2023-01-21T08:00:26.312Z",
                    id: "63cb9b9a9fd3dfb4c0cadbd3"
                },
                productVariant: {
                    picture: "picture-1674228179962-244426488.jpeg",
                    name: "Salade grecque",
                    sellingPrice: 325,
                    crossedOutPrice: 450,
                    description: "Salade dans sa variante grecque",
                    allergene: "Animal proteins, animal dander, Dust, Drugs",
                    createdAt: "2023-01-20T15:22:59.975Z",
                    updatedAt: "2023-01-20T15:22:59.975Z",
                    id: "63cab1d3d476170206f626d7"
                },
                isPregnant: true,

                price: 325,
                ingredientsModifiablesStates: [],
                cookingStation: "Cuisine"
            },
            {
                insitutionID: "63c55a736bc6def4ca70ba89",
                tableID: "63c561ee46bc59e51dc4ac72",
                tableNumber: 30,
                tableZoneName: "EFFS554465445",
                product: {
                    name: "Salade",
                    hapyHour: false,
                    cookingStation: "Cuisine",
                    institution: "63c55a736bc6def4ca70ba89",
                    createdAt: "2023-01-21T08:00:26.312Z",
                    updatedAt: "2023-01-21T08:00:26.312Z",
                    id: "63cb9b9a9fd3dfb4c0cadbd3"
                },
                productVariant: {
                    picture: "picture-1674227738743-332052949.jpeg",
                    name: "La Cocotte",
                    sellingPrice: 350,
                    crossedOutPrice: 450,
                    description: "Salade dans sa variante cocotte",
                    allergene: "Animal proteins, animal dander, Dust, Drugs",
                    createdAt: "2023-01-20T15:15:38.757Z",
                    updatedAt: "2023-01-20T15:15:38.757Z",
                    id: "63cab01a952ed3ce8deaa99a"
                },
                isPregnant: true,

                price: 350,
                ingredientsModifiablesStates: [],
                cookingStation: "Cuisine"
            }
        ],
        notificationID: "45644646EFSDSOFDSJJF"
    }

] ;
