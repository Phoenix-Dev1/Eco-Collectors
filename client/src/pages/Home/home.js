import React from 'react';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {
  return (
    <div className="font-sans bg-gray-800 dark:bg-gray-800 text-white">
      <main className="container mx-auto flex flex-col py-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4">
            Hello and welcome to Eco Collectors!
          </h2>
          {/* <img
            src="./jpg/bosses.jpg"
            alt="Example"
            className="rounded-lg mb-3"
          /> */}
          <p className="mb-6">
            This is the website of Eco Collectors, and we are trying to make
            Israel/Haifa cleaner. We here at Eco Collectors have created this
            website to help people learn how to recycle correctly and find
            recycling facilities. Our vision for Israel in the coming years is
            for people to recycle more and understand the importance of
            recycling in making Israel cleaner.
          </p>
          <h3 className="text-2xl font-semibold mb-4">
            The Importance of Recycling
          </h3>
          <p className="mb-6">
            Why should we recycle? It’s a fairly simple concept. When you
            transform something old into something new, it benefits the
            environment in a number of ways. Materials and natural resources
            aren’t wasted. Energy is saved during the manufacturing process.
            There’s less waste going to landfills. Not to mention, it helps keep
            wildlife safe. Recycling also helps create well-paying jobs. A study
            in 2016 found that recycling and reuse activities in the United
            States accounted for 757,000 jobs. We can all make a difference by
            practicing proper recycling. As the County of Arlington Virginia
            Trash and Recycling site says, “Recyclables are collected locally,
            but impacted globally.”
          </p>
          <h3 className="text-2xl font-semibold mb-4">How to Recycle</h3>
          <p className="mb-6">
            The main barrier to recycling is understanding the process. That
            means knowing where and what to recycle. Each city has its own
            regulations and processes for recycling. Make sure you do your
            research, or you can always come here!
          </p>
          <h3 className="text-2xl font-semibold mb-4">
            What to Recycle in Israel
          </h3>
          <h4 className="text-xl font-semibold mb-2">The blue bin</h4>
          <p className="mb-6">
            The blue bins are for paper waste. Paper and cartons make up about
            twenty-five percent of all waste in Israel, so recycling them
            significantly reduces the volume of garbage that ends up in
            landfills. In addition, the repeated use of paper reduces the scope
            of cutting down trees, which are essential for maintaining the
            balance of our world. The contents collected in the blue bins are
            transported by trucks to the recycling plants, carefully sorted,
            washed with chemicals, compressed in a press into cubes weighing
            over half a ton, and transported to the production plants. There,
            the paper cubes are soaked in a large tank of water until they
            become fibers. As a result, a sticky paper pulp is formed, to which
            substances are added to improve the color and other qualities. The
            water is squeezed out of the mixture, heated with steam, and new
            paper is obtained. Here are the main types of waste that must be
            thrown into the blue bin: Newspapers, magazines, cardboard,
            notebooks, pamphlets, Bristol, paper packaging, printing paper,
            paper wrappers, cornflakes packaging, and more.
          </p>
          <h4 className="text-xl font-semibold mb-2">The brown bin</h4>
          <p className="mb-6">
            The brown bins are for organic waste. About forty percent of all
            household waste in Israel consists of wet garbage, mainly including
            food scraps. Today in Israel, awareness of the separation of wet
            waste still needs improvement. Some households have already started
            independent sorting of wet waste and turning it into compost in home
            composters, mainly in rural communities or among residents living in
            detached houses. There are regional and local councils that
            distribute composters to their residents free of charge. In
            addition, there are local and municipal councils that collect,
            remove, and recycle the wet waste for their residents. Authorities
            that promote the recycling of wet waste will be incentivized and
            rewarded accordingly. Wet waste is an excellent raw material for the
            production of compost and organic fertilizer for agriculture and is
            even used in fuel and energy production processes. Here are the main
            types of waste that must be thrown into the brown bin: Fruits,
            vegetables, peels of vegetables and fruits, bread, pies, snacks,
            fat, fish, insects, canned foods, and more.
          </p>
          <h4 className="text-xl font-semibold mb-2">The orange bin</h4>
          <p className="mb-6">
            The orange bins are for all types of packaging (except cardboard and
            glass). These bins were placed in recycling centers throughout the
            country starting in 2012, following the enactment of the Packaging
            Law. The contents of the orange bins include metal packaging, drink
            bottles, beverage cartons, hard plastic packaging, plastic bags, and
            more. Each type of waste is treated differently and arrives at its
            designated recycling plant. For example, metal packaging waste is
            melted down for use in the building industry, while paper is sorted,
            broken down into fibers, squeezed, and heated for reuse in the
            production of sheets or toilet paper. Plastic packaging waste is
            also recycled, washed, shredded into thin flakes, and used to
            manufacture various plastic products. Here are the main types of
            waste that must be thrown into the orange bin: Plastic packaging
            such as milk containers, salad boxes, plastic bags, food packaging,
            packaging of hygiene products, various metal packaging, milk and
            juice cartons, and more.
          </p>
          <h4 className="text-xl font-semibold mb-2">The purple bin</h4>
          <p className="mb-6">
            The purple bins are for glass packaging waste. Glass packaging makes
            up about 1.2% of all trash in terms of volume and about 3% of the
            weight of total household waste. Glass waste is recycled in
            factories specializing in glass production processes for reuse, used
            to build infrastructure such as roads and roof tiles. Recycling
            glass saves on natural raw materials and energy since its melting
            temperature is significantly lower than that of raw sand. In
            addition, glass recycling reduces the total volume of waste sent to
            landfills. Here are the main types of waste that must be thrown into
            the purple bin: Bottles of olive oil, coffee jars, perfume bottles,
            jars of baby food, jars of jam and honey, wine bottles, and broken
            glassware.
          </p>
          <h4 className="text-xl font-semibold mb-2">The gray bin</h4>
          <p className="mb-6">
            The gray bins are only found in some authorities in Israel, mainly
            in councils where waste is separated in recycling centers or in
            places where there are no orange bins. These bins are intended for
            collecting metallic waste, including ferrous and non-ferrous metals,
            which are recycled by melting in dedicated furnaces in specialized
            factories. The metallic waste collected in the gray bins is melted
            and transferred to molds for the casting of new products.
          </p>
          <h4 className="text-xl font-semibold mb-2">The cartoner</h4>
          <p className="mb-6">
            The cartoner is intended for the collection of thick cardboard
            packages only. The packages must be flattened before throwing them
            into the cartoner facility. Paper and cardboard together make up
            about 24% of the weight of all waste and up to about 28% of its
            volume. In Israel, approximately one million tons of paper and
            cardboard are produced, which have a very high recycling and reuse
            potential. The cartons collected in Cartonia are mainly used for the
            repeated production of cardboard packaging. Here are the main types
            of waste that must be thrown into the cartoner: Cardboard packaging
            of electrical products, fruits and vegetables, gifts and toys, and
            more.
          </p>
          <h4 className="text-xl font-semibold mb-2">
            Collection facilities for electronic waste
          </h4>
          <p className="mb-6">
            The weight of electronic waste in Israel reaches about 130,000 tons
            every year and is constantly increasing. In 2012, a law was enacted
            for the treatment of electronic equipment and batteries to regulate
            reuse and reduce the negative environmental effects of waste from
            various electrical appliances. Batteries cannot be recycled due to
            their toxicity, but it is important to treat them in a way that
            prevents heavy environmental damage. Other parts of electronic waste
            are intended for reuse and recycling. Here are the main types of
            waste that must be disposed of at electronic waste collection
            facilities: Broken or old electrical appliances, batteries,
            accumulators, and more.
          </p>
          <h4 className="text-xl font-semibold mb-2">The green bin</h4>
          <p className="mb-6">
            The waste thrown into the green bin is that which cannot be sorted
            in the recycling facilities and the various separate bins mentioned
            above. Most of the waste collected in the green bins is intended for
            landfill and not for recycling. However, the green bins are intended
            for dry waste, and sometimes there are sorting and recycling
            processes for the garbage thrown into them. The waste is transported
            on a conveyor belt to separate the wet sediments and manually
            classified according to types of materials, which will be
            transferred to the relevant recycling plants. Here are the main
            types of waste that must be thrown into the green bin: Diapers, wet
            wipes, waste that is not packaging, and any waste that cannot be
            sorted in the other bins.
          </p>
          <a
            href="#"
            className="fixed w-12 h-12 bg-blue-700 bottom-12 right-8 flex items-center justify-center text-black text-lg rounded-full hover:text-white"
          >
            <FontAwesomeIcon icon={faAngleUp} />
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;
