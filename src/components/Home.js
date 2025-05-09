
import AboutUs from "./About";
import Advertisement from "./Advertisement";
import Newarrival from "./Newarrival";
import Adtextbox from "./adtextbox";
import Footer from "./footer";
import Ourclients from "./ourclients";
import Ourproducts from "./ourproducts";

function Home() {
    return (<div>
        <Advertisement></Advertisement>
        <Adtextbox></Adtextbox>
        <Newarrival></Newarrival>
        <Ourproducts></Ourproducts>
        <Ourclients></Ourclients>
        <AboutUs></AboutUs>
        <Footer></Footer>
        
        </div>
    )
}

export default Home;
