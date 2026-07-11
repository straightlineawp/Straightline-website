import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySku, getProductSpecs } from '../data/api';
import { getAssetsForSku } from '../data/assetsMap';
import { 
  MessageCircle, Play, CheckCircle2, Phone, FileText,
  Settings, Zap, Maximize2, Building2, Factory, Plane, Warehouse, ShieldCheck, Ruler, Wrench, ChevronRight, Activity, Package, HardHat
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Product = () => {
  const { sku } = useParams<{ sku: string }>();
  const [isImperial, setIsImperial] = useState(false);
  const [activeMedia, setActiveMedia] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && videoRef.current) {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [activeMedia]);

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi, I'm interested in the ${sku} model.
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Message: ${formData.message}`;
    window.open(`https://wa.me/919811803530?text=${encodeURIComponent(text)}`, '_blank');
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sku]);

  const product = getProductBySku(sku || '');
  const specs = getProductSpecs(sku || '');
  const { folder, images, video } = getAssetsForSku(sku || '');
  
  const mediaList = [...images.map(img => ({ type: 'image', url: `/assets/${folder}/${img}` }))];
  if (video) {
    mediaList.unshift({ type: 'video', url: `/assets/${folder}/${video}` });
  }
  
  let catSlug = 'scissor-lifts';
  if (sku?.includes('A')) catSlug = 'articulated-boom-lifts';
  if (sku?.includes('T')) catSlug = 'telescopic-boom-lifts';
  if (sku?.includes('GTJZ')) catSlug = 'scissor-lifts';

  const articulatedDescriptions: Record<string, string> = {
    'SL16A': 'The STRAIGHTLINE SL16A Diesel Articulated Boom Lift is a versatile aerial work platform designed for safe and efficient elevated access across construction, industrial maintenance, facility management, and infrastructure projects. Its articulated boom provides outstanding flexibility, allowing operators to reach over obstacles and access confined work areas with ease. Powered by a reliable diesel engine, the SL16A delivers dependable performance on rough terrain and challenging outdoor job sites. The spacious platform offers ample room for workers and essential tools, improving productivity while maintaining safety. Whether performing steel erection, painting, electrical installation, glazing, or routine maintenance, the SL16A provides a reliable, cost-effective solution for professionals seeking durability, stability, and high performance in everyday elevated work applications.',
    'SL21A': 'The STRAIGHTLINE SL21A Diesel Articulated Boom Lift is engineered to provide greater working height and exceptional maneuverability for demanding access applications. Its articulated boom design allows operators to work around structures, machinery, pipelines, and other obstacles without frequent repositioning, saving valuable time on site. Equipped with a powerful diesel engine and rugged all-terrain capability, the SL21A performs reliably on construction sites, industrial facilities, airports, and infrastructure projects. The machine features smooth hydraulic controls, a spacious work platform, and advanced safety systems to maximize operator confidence and productivity. Ideal for contractors, rental companies, and maintenance professionals, the SL21A delivers dependable performance, reduced downtime, and efficient operation in even the most challenging working environments.',
    'SL28A': 'The STRAIGHTLINE SL28A Diesel Articulated Boom Lift is a high-performance aerial work platform built for projects requiring extended working height and excellent horizontal outreach. Designed for demanding outdoor environments, it allows operators to safely reach elevated work areas while navigating around obstacles with precision. Its heavy-duty construction, powerful diesel engine, and four-wheel-drive capability ensure outstanding performance on uneven terrain, making it suitable for commercial construction, bridge maintenance, steel fabrication, airports, shipyards, and industrial plants. The spacious platform accommodates operators and tools comfortably while advanced hydraulic controls provide smooth and accurate positioning. Combining reliability, safety, and productivity, the SL28A is an excellent choice for contractors and equipment rental companies seeking dependable elevated access solutions.',
    'SL34A': 'The STRAIGHTLINE SL34A Diesel Articulated Boom Lift is designed for large-scale construction, infrastructure, and industrial maintenance projects where additional height and outreach are essential. Its articulated boom enables operators to work efficiently around buildings, structural steel, equipment, and other obstacles while minimizing machine repositioning. Built with a durable chassis, reliable diesel powertrain, and excellent terrain capability, the SL34A performs confidently on demanding outdoor job sites. The spacious work platform, intuitive controls, and integrated safety features help improve efficiency while ensuring operator comfort. Ideal for high-rise construction, petrochemical facilities, power plants, airports, and heavy engineering projects, the SL34A delivers consistent performance and outstanding reliability in challenging working conditions.',
    'SL52A': 'The STRAIGHTLINE SL52A Diesel Articulated Boom Lift represents the highest level of elevated access for specialized applications requiring exceptional working height and outreach. Built for major infrastructure projects, power plants, refineries, stadium construction, wind energy installations, and industrial maintenance, it provides safe and reliable access to difficult-to-reach work areas. Its robust diesel-powered drivetrain, heavy-duty boom structure, and advanced hydraulic system deliver outstanding stability and smooth operation even on demanding terrain. The spacious platform accommodates multiple operators and equipment, helping improve productivity while maintaining safety. Designed for maximum performance and durability, the SL52A is an ideal solution for contractors and rental companies handling the most demanding work-at-height applications.',
    'SL16A-EV': 'The STRAIGHTLINE SL16A-EV Electric Articulated Boom Lift combines efficient elevated access with environmentally friendly operation. Its zero-emission electric drive makes it ideal for indoor facilities, warehouses, shopping malls, airports, hospitals, manufacturing plants, and commercial buildings where quiet operation is essential. The articulated boom allows operators to reach difficult work areas around obstacles while maintaining excellent stability and precision. Advanced battery technology delivers reliable working hours with reduced operating costs and minimal maintenance. Designed for facility management, electrical work, HVAC installation, painting, and routine maintenance, the SL16A-EV provides a safe, productive, and sustainable solution for modern elevated access applications.',
    'SL21A-EV': 'The STRAIGHTLINE SL21A-EV Electric Articulated Boom Lift is engineered to deliver superior working height while maintaining clean, quiet, and energy-efficient operation. Its articulated boom enables operators to easily reach elevated areas over obstacles, making it ideal for industrial maintenance, commercial construction, airports, logistics centres, exhibition halls, and manufacturing facilities. Equipped with advanced electric drive technology and precision controls, the machine provides smooth operation, excellent maneuverability, and lower operating costs compared to conventional diesel-powered equipment. The spacious platform, dependable battery performance, and enhanced safety features make the SL21A-EV a reliable solution for organizations seeking sustainable and efficient work-at-height equipment.',
    'SL28A-EV': 'The STRAIGHTLINE SL28A-EV Electric Articulated Boom Lift is designed for professionals requiring high-reach access with zero emissions and low noise levels. Its advanced electric drive system delivers smooth operation, reduced maintenance, and excellent energy efficiency while providing impressive working height and outreach. Ideal for airports, factories, exhibition centres, logistics hubs, commercial buildings, and industrial maintenance projects, the articulated boom offers exceptional flexibility for accessing difficult locations. A spacious platform, intelligent control system, and multiple safety features ensure comfortable and secure operation throughout the workday. The SL28A-EV combines sustainability, performance, and productivity in one dependable elevated access solution.',
    'SL34A-EV': 'The STRAIGHTLINE SL34A-EV Electric Articulated Boom Lift is built to handle demanding elevated work while delivering clean and environmentally responsible performance. Featuring an advanced battery-powered drive system, it offers low operating costs, quiet operation, and reduced maintenance requirements. The articulated boom provides excellent flexibility for navigating around obstacles, making it ideal for maintenance, installation, inspection, and construction work in industrial facilities, airports, warehouses, and commercial developments. Designed with operator safety, comfort, and productivity in mind, the SL34A-EV offers reliable performance, smooth hydraulic controls, and dependable stability for professional work-at-height applications.',
    'SL52A-EV': 'The STRAIGHTLINE SL52A-EV Electric Articulated Boom Lift is a premium elevated access solution developed for specialized projects requiring exceptional working height combined with sustainable operation. Its advanced electric powertrain delivers quiet, emission-free performance while reducing maintenance and operating costs. Designed for large industrial facilities, power plants, airports, stadiums, and high-rise maintenance projects, the articulated boom provides outstanding flexibility and precise positioning around complex structures. A spacious platform, intelligent safety systems, and reliable battery technology ensure maximum productivity throughout demanding work schedules. The SL52A-EV offers an environmentally friendly alternative without compromising on performance, stability, or operator confidence.'
  };

  const telescopicDescriptions: Record<string, string> = {
    'SL16T': 'The STRAIGHTLINE SL16T Diesel Telescopic Boom Lift is a dependable aerial work platform designed to provide safe, efficient, and direct access to elevated work areas. Its telescopic boom extends in a straight line, making it ideal for projects requiring long horizontal outreach without the complexity of articulated movement. Powered by a reliable diesel engine and built with a rugged chassis, the SL16T performs confidently on uneven terrain and demanding outdoor job sites. It is well suited for construction, industrial maintenance, warehouse expansion, steel erection, utility installation, and infrastructure development. Combining smooth operation, operator comfort, and dependable performance, the SL16T helps businesses complete work faster while maintaining high safety standards.',
    'SL21T': 'The STRAIGHTLINE SL21T Diesel Telescopic Boom Lift is engineered for professionals who require greater working height and outstanding horizontal reach. Its straight telescopic boom allows operators to access elevated work areas quickly and efficiently, making it ideal for structural steel installation, bridge construction, airport maintenance, industrial plants, and commercial construction projects. Equipped with a powerful diesel engine, excellent ground clearance, and four-wheel-drive capability, the machine delivers reliable performance even on rough terrain. Smooth hydraulic controls, a spacious work platform, and advanced safety systems improve productivity while ensuring operator confidence. The SL21T is an ideal solution for contractors and rental fleets seeking reliable, high-performance access equipment.',
    'SL28T': 'The STRAIGHTLINE SL28T Diesel Telescopic Boom Lift delivers exceptional working height, extended outreach, and heavy-duty performance for demanding industrial applications. Designed to provide fast access to difficult work locations, its telescopic boom minimizes repositioning and increases productivity on site. The machine is built with a durable frame, reliable diesel powertrain, and robust four-wheel-drive system capable of handling uneven construction sites and outdoor environments. Ideal for airports, shipyards, refineries, metro projects, warehouses, power plants, and high-rise construction, the SL28T offers excellent stability, smooth boom operation, and a spacious work platform. It is an excellent investment for companies requiring dependable elevated access equipment for heavy-duty operations.',
    'SL34T': 'The STRAIGHTLINE SL34T Diesel Telescopic Boom Lift is designed for large infrastructure and industrial projects requiring exceptional reach and working height. Its straight telescopic boom enables quick positioning and superior horizontal access, making it ideal for building construction, bridge maintenance, oil & gas facilities, mining operations, and heavy engineering applications. Powered by a dependable diesel engine and supported by a rugged all-terrain chassis, the SL34T delivers excellent performance in demanding environments. Advanced hydraulic controls, a spacious operator platform, and multiple integrated safety features provide a safe and efficient working experience. Built for durability and productivity, the SL34T helps contractors complete challenging projects with confidence.',
    'SL52T': 'The STRAIGHTLINE SL52T Diesel Telescopic Boom Lift is engineered for extreme-height access applications where maximum reach and reliability are essential. Designed for large-scale infrastructure projects, power plants, stadium construction, refinery maintenance, wind energy installations, and industrial shutdowns, it offers exceptional working height with outstanding horizontal outreach. Its heavy-duty diesel powertrain, reinforced boom structure, and advanced hydraulic system ensure stable and efficient performance even in the toughest working conditions. The spacious platform accommodates operators and equipment comfortably, while advanced safety features help maximize productivity. The SL52T is the ideal choice for organizations seeking premium access solutions for the most demanding work-at-height applications.',
    'SL16T-EV': 'The STRAIGHTLINE SL16T-EV Electric Telescopic Boom Lift provides efficient elevated access with the benefits of clean, quiet, and emission-free operation. Its straight telescopic boom delivers excellent horizontal reach for indoor and outdoor maintenance tasks while advanced battery technology ensures reliable daily performance. Designed for warehouses, manufacturing plants, airports, shopping malls, hospitals, and commercial facilities, the SL16T-EV offers smooth operation, low maintenance requirements, and reduced operating costs. Compact dimensions and intuitive controls make it easy to maneuver in confined spaces, making it an ideal solution for businesses looking for environmentally friendly access equipment without compromising productivity.',
    'SL21T-EV': 'The STRAIGHTLINE SL21T-EV Electric Telescopic Boom Lift combines extended working height with sustainable electric performance for modern industrial and commercial applications. Its telescopic boom provides excellent straight-line outreach, allowing operators to reach elevated work areas quickly and efficiently. Equipped with advanced electric drive technology, the machine operates quietly while producing zero emissions, making it suitable for airports, logistics centres, warehouses, factories, and exhibition halls. The spacious platform, precise controls, and dependable battery system improve operator productivity and comfort throughout the workday. The SL21T-EV is an ideal choice for organizations seeking reliable and environmentally responsible aerial access equipment.',
    'SL28T-EV': 'The STRAIGHTLINE SL28T-EV Electric Telescopic Boom Lift is built for demanding elevated access applications requiring exceptional reach and environmentally friendly operation. Featuring a powerful electric drive system, advanced battery technology, and smooth telescopic boom movement, it provides reliable performance while minimizing maintenance and operating costs. Ideal for manufacturing facilities, airports, commercial buildings, industrial maintenance, and logistics centres, the machine offers outstanding horizontal outreach and excellent platform stability. Designed with operator safety and comfort in mind, the SL28T-EV combines productivity, precision, and sustainability to meet the growing demand for clean aerial work platform solutions.',
    'SL34T-EV': 'The STRAIGHTLINE SL34T-EV Electric Telescopic Boom Lift is designed to deliver superior working height and long horizontal reach while maintaining quiet, emission-free performance. Built for demanding industrial environments, it enables operators to access elevated work areas safely and efficiently with minimal environmental impact. Advanced electric drive technology, precision controls, and a spacious work platform contribute to improved productivity and lower operating costs. Ideal for airports, manufacturing plants, commercial buildings, warehouses, and facility maintenance, the SL34T-EV provides dependable performance, outstanding stability, and sustainable operation for a wide range of elevated access applications.',
    'SL52T-EV': 'The STRAIGHTLINE SL52T-EV Electric Telescopic Boom Lift represents the next generation of high-reach aerial work platforms, combining exceptional working height with clean electric operation. Designed for specialized maintenance, industrial facilities, stadiums, airports, power plants, and large infrastructure projects, it offers impressive horizontal outreach while eliminating emissions and significantly reducing noise levels. Its advanced battery system, intelligent control technology, and robust boom structure ensure dependable performance during demanding work schedules. The spacious platform provides a safe and comfortable working environment for operators, making the SL52T-EV an ideal solution for organizations focused on productivity, sustainability, and world-class elevated access performance.'
  };

  const scissorDescriptions: Record<string, string> = {
    'SLGTJZ06': 'The STRAIGHTLINE SLGTJZ06 Electric Self-Propelled Scissor Lift is a compact and reliable aerial work platform designed for safe indoor elevated access. With excellent maneuverability and zero-emission electric operation, it is ideal for warehouses, shopping malls, factories, offices, hotels, hospitals, and commercial buildings. Its self-propelled drive system allows operators to move the machine while elevated, reducing downtime and improving productivity. The spacious platform provides ample space for personnel and tools, while the stable scissor mechanism ensures smooth lifting performance. Built for efficiency, safety, and low maintenance, the SLGTJZ06 is an ideal solution for facility maintenance, electrical work, ceiling installation, painting, and routine inspection tasks.',
    'SLGTJZ08': 'The STRAIGHTLINE SLGTJZ08 Electric Self-Propelled Scissor Lift delivers greater working height while maintaining excellent stability, compact dimensions, and quiet operation. Designed for indoor and smooth-surface applications, it is widely used for maintenance, installation, warehouse operations, lighting work, HVAC servicing, and commercial construction. Its efficient electric drive system produces zero emissions, making it suitable for enclosed environments where clean operation is essential. The self-propelled functionality allows operators to reposition the machine without lowering the platform, significantly improving work efficiency. Combining durability, operator comfort, and dependable performance, the SLGTJZ08 is a practical solution for businesses requiring reliable elevated access equipment.',
    'SLGTJZ10': 'The STRAIGHTLINE SLGTJZ10 Electric Self-Propelled Scissor Lift is designed for professionals requiring increased working height with reliable indoor performance. Featuring a robust scissor mechanism, smooth electric drive, and advanced safety systems, it provides safe and efficient access for maintenance, construction, electrical installation, HVAC work, warehouse management, and facility operations. Its compact turning radius enables easy maneuverability through narrow aisles and confined workspaces, while the spacious platform accommodates operators and essential equipment comfortably. Built with productivity and operator safety in mind, the SLGTJZ10 delivers dependable performance, low operating costs, and excellent reliability for daily elevated work applications.',
    'SLGTJZ12': 'The STRAIGHTLINE SLGTJZ12 Electric Self-Propelled Scissor Lift offers extended working height combined with excellent platform stability and smooth electric operation. Designed for commercial buildings, warehouses, airports, manufacturing facilities, and maintenance contractors, it enables operators to safely perform elevated work with maximum efficiency. The self-propelled drive system allows seamless movement between work locations without lowering the platform, saving valuable time throughout the workday. Its durable construction, low maintenance requirements, and user-friendly controls make it a dependable choice for electrical work, signage installation, painting, inspection, and general facility maintenance where safety and productivity are top priorities.',
    'SLGTJZ14': 'The STRAIGHTLINE SLGTJZ14 Electric Self-Propelled Scissor Lift is engineered for demanding indoor elevated access applications requiring greater working height and dependable performance. Its powerful electric drive system provides quiet, emission-free operation while the robust scissor mechanism ensures excellent stability during lifting operations. Suitable for warehouses, industrial facilities, airports, shopping centres, exhibition halls, and commercial construction projects, the SLGTJZ14 improves productivity with its self-propelled functionality and spacious work platform. Advanced safety features, precision controls, and durable construction make it an ideal choice for businesses seeking efficient, safe, and reliable aerial work platforms.',
    'SLGTJZ03': 'The STRAIGHTLINE SLGTJZ03 Mini Electric Scissor Lift is an ultra-compact aerial work platform designed for low-level indoor maintenance and installation tasks. Lightweight and highly maneuverable, it easily passes through standard doorways and narrow aisles, making it ideal for offices, retail stores, hotels, schools, hospitals, warehouses, and commercial buildings. Its quiet electric drive and zero-emission operation allow safe use in enclosed environments without disrupting daily operations. Designed for lighting maintenance, electrical work, painting, ceiling repairs, and routine inspections, the SLGTJZ03 offers an economical, reliable, and user-friendly solution for businesses requiring safe access to elevated work areas.',
    'SLGTJZ04': 'The STRAIGHTLINE SLGTJZ04 Mini Electric Scissor Lift combines compact dimensions with enhanced working height, providing a practical solution for indoor elevated access. Its lightweight construction and smooth electric operation make it easy to transport and maneuver through confined spaces while delivering excellent platform stability. Ideal for shopping malls, warehouses, hotels, educational institutions, hospitals, and maintenance contractors, it supports a wide range of applications including electrical installation, painting, signage fitting, HVAC servicing, and routine building maintenance. With low maintenance requirements and reliable performance, the SLGTJZ04 helps improve workplace safety and operational efficiency.',
    'SLGTJZ04.5': 'The STRAIGHTLINE SLGTJZ04.5 Mini Electric Scissor Lift offers additional platform height while maintaining the portability and maneuverability expected from a compact aerial work platform. Its durable design, quiet electric operation, and user-friendly controls make it ideal for indoor maintenance tasks in commercial buildings, retail outlets, offices, airports, and warehouses. The stable scissor lifting mechanism ensures safe operation while the compact footprint allows easy movement in restricted workspaces. Whether used for lighting installation, cleaning, inspections, decoration, or facility maintenance, the SLGTJZ04.5 provides reliable elevated access with minimal operating costs.',
    'SLGTJZ05.6': 'The STRAIGHTLINE SLGTJZ05.6 Mini Electric Scissor Lift is designed for users requiring greater working height without sacrificing compactness or mobility. Its efficient electric drive system delivers quiet, zero-emission performance suitable for indoor environments, while the robust lifting mechanism ensures excellent stability and operator confidence. Widely used in factories, warehouses, commercial buildings, hospitals, airports, and maintenance departments, the machine is ideal for electrical work, ceiling installation, cleaning, inspection, painting, and equipment servicing. Built for durability and ease of operation, the SLGTJZ05.6 provides dependable performance and excellent value for everyday elevated access requirements.',
    'SLGTJZ06A': 'The STRAIGHTLINE SLGTJZ06A Mini Electric Scissor Lift is built to deliver enhanced lifting performance in a compact and highly maneuverable design. Its self-contained electric power system provides quiet, environmentally friendly operation, making it suitable for warehouses, manufacturing facilities, commercial buildings, shopping malls, and educational institutions. Designed for maintenance professionals, contractors, and facility managers, it offers reliable performance for lighting installation, painting, inspection, electrical servicing, and general maintenance work. The spacious platform, intuitive controls, and advanced safety systems ensure efficient operation while reducing operator fatigue and maximizing productivity throughout the workday.',
    'SLGTJZ08A': 'The STRAIGHTLINE SLGTJZ08A Mini Electric Scissor Lift is the highest-reaching model in the mini scissor lift range, offering outstanding performance for indoor elevated access applications. Combining compact dimensions with increased platform height, it enables operators to safely complete maintenance, installation, inspection, and repair tasks in warehouses, airports, factories, commercial buildings, and exhibition centres. Its efficient electric drive system ensures quiet, zero-emission operation while requiring minimal maintenance. Built with a durable frame, smooth lifting mechanism, and comprehensive safety features, the SLGTJZ08A provides businesses with a dependable, productive, and cost-effective solution for professional work-at-height requirements.',
    'SLZTLD-GTJZ10': 'The STRAIGHTLINE SLZTLD-GTJZ10 Crawler Scissor Lift is specially designed for elevated work on rough, uneven, and sloped terrain where conventional wheeled scissor lifts cannot operate effectively. Equipped with durable crawler tracks, it delivers excellent traction, stability, and maneuverability across mud, gravel, sand, and unfinished construction sites. Its electric drive system provides efficient and environmentally friendly operation while reducing maintenance requirements. Ideal for construction projects, landscaping, bridge maintenance, railway work, and infrastructure development, the SLZTLD-GTJZ10 offers reliable lifting performance and enhanced operator safety. Built with a robust frame and intuitive controls, it ensures maximum productivity in demanding outdoor environments while providing a dependable solution for challenging work-at-height applications.',
    'SLZTLD-GTJZ12': 'The STRAIGHTLINE SLZTLD-GTJZ12 Crawler Scissor Lift combines increased working height with superior off-road capability, making it an ideal aerial work platform for challenging construction and industrial environments. Its crawler track system enables smooth travel over uneven ground, steep inclines, soft surfaces, and rugged terrain while maintaining excellent platform stability. Designed for contractors, maintenance teams, and infrastructure projects, it is widely used for bridge construction, railway maintenance, power line installation, industrial facilities, and outdoor engineering work. The electric drive system delivers quiet, low-maintenance performance while advanced safety features provide operator confidence. Durable construction and dependable lifting performance make the SLZTLD-GTJZ12 a reliable solution for demanding elevated access applications.',
    'SLZTLD-GTJZ14': 'The STRAIGHTLINE SLZTLD-GTJZ14 Crawler Scissor Lift is engineered for professionals requiring maximum off-road performance and higher working heights. Featuring a heavy-duty crawler undercarriage, it easily navigates uneven terrain, muddy construction sites, gravel roads, slopes, and difficult outdoor conditions where traditional access equipment may struggle. Its powerful electric drive system delivers reliable performance with minimal operating costs, while the stable scissor lifting mechanism ensures safe operation throughout demanding work schedules. Suitable for infrastructure projects, industrial plants, renewable energy installations, railway construction, and maintenance work, the SLZTLD-GTJZ14 provides exceptional mobility, operator safety, and dependable productivity for challenging work-at-height environments.',
    'SLYY-GTJZ10': 'The STRAIGHTLINE SLYY-GTJZ10 Rough Terrain Scissor Lift is built for demanding outdoor applications requiring reliable elevated access on uneven ground. Designed with a rugged chassis, high ground clearance, and large all-terrain wheels, it performs efficiently across construction sites, infrastructure projects, warehouses, and industrial facilities. Its powerful electric drive system delivers dependable performance while reducing emissions and maintenance costs. The spacious work platform accommodates operators and tools comfortably, improving efficiency during installation, maintenance, inspection, and construction work. Combining durability, stability, and advanced safety systems, the SLYY-GTJZ10 is an ideal solution for contractors seeking dependable aerial work equipment for challenging outdoor environments.',
    'SLYY-GTJZ12': 'The STRAIGHTLINE SLYY-GTJZ12 Rough Terrain Scissor Lift offers increased working height and exceptional stability for demanding outdoor elevated access applications. Designed for construction companies, industrial maintenance teams, and infrastructure contractors, it easily handles uneven surfaces while maintaining excellent lifting performance. Its rugged all-terrain design, dependable electric drive system, and durable construction enable safe operation across gravel, dirt, and unfinished work sites. The spacious platform allows operators to work comfortably with tools and materials, reducing downtime and increasing productivity. Whether used for structural work, building maintenance, utility installation, or inspection projects, the SLYY-GTJZ12 delivers reliable performance and outstanding operational efficiency.',
    'SLYY-GTJZ14': 'The STRAIGHTLINE SLYY-GTJZ14 Rough Terrain Scissor Lift is engineered to provide safe, stable, and efficient elevated access for large outdoor projects. Featuring a robust frame, advanced electric drive technology, and excellent terrain capability, it is suitable for demanding work environments including commercial construction, industrial facilities, airports, mining operations, and infrastructure development. Its large platform provides sufficient space for operators, tools, and materials while the precision lifting mechanism ensures smooth and controlled elevation. Designed for durability and operator comfort, the SLYY-GTJZ14 helps businesses improve productivity while maintaining the highest standards of workplace safety.',
    'SLYY-GTJZ16': 'The STRAIGHTLINE SLYY-GTJZ16 Rough Terrain Scissor Lift delivers superior working height and dependable performance for heavy-duty outdoor access applications. Built with reinforced structural components, a rugged all-terrain chassis, and advanced electric drive technology, it performs confidently across rough construction sites, industrial plants, logistics yards, airports, and infrastructure projects. The spacious work platform allows multiple operators to work efficiently while carrying essential tools and materials. Smooth controls, reliable lifting performance, and comprehensive safety features contribute to increased productivity and reduced operator fatigue. The SLYY-GTJZ16 is an excellent choice for contractors and equipment rental businesses requiring reliable aerial work platforms.',
    'SLYY-GTJZ20': 'The STRAIGHTLINE SLYY-GTJZ20 Rough Terrain Scissor Lift is the flagship model in the rough terrain scissor lift range, offering exceptional working height, outstanding lifting capacity, and reliable outdoor performance. Designed for major construction projects, industrial facilities, infrastructure development, power plants, airports, and heavy engineering applications, it provides safe and efficient elevated access in demanding environments. Its rugged all-terrain design ensures excellent traction and stability on uneven surfaces, while the spacious platform comfortably accommodates multiple operators, tools, and equipment. Equipped with advanced safety systems, durable construction, and dependable electric drive technology, the SLYY-GTJZ20 delivers maximum productivity, reduced maintenance, and long-term reliability, making it an ideal solution for professional work-at-height operations across a wide range of industries.'
  };

  const scissorSubtitles: Record<string, string> = {
    'SLGTJZ06': 'Electric Self-Propelled Scissor Lift',
    'SLGTJZ08': 'Electric Self-Propelled Scissor Lift',
    'SLGTJZ10': 'Electric Self-Propelled Scissor Lift',
    'SLGTJZ12': 'Electric Self-Propelled Scissor Lift',
    'SLGTJZ14': 'Electric Self-Propelled Scissor Lift',
    'SLGTJZ03': 'Mini Electric Scissor Lift',
    'SLGTJZ04': 'Mini Electric Scissor Lift',
    'SLGTJZ04.5': 'Mini Electric Scissor Lift',
    'SLGTJZ05.6': 'Mini Electric Scissor Lift',
    'SLGTJZ06A': 'Mini Electric Scissor Lift',
    'SLGTJZ08A': 'Mini Electric Scissor Lift',
    'SLZTLD-GTJZ10': 'Crawler Scissor Lift',
    'SLZTLD-GTJZ12': 'Crawler Scissor Lift',
    'SLZTLD-GTJZ14': 'Crawler Scissor Lift',
    'SLYY-GTJZ10': 'Rough Terrain Scissor Lift',
    'SLYY-GTJZ12': 'Rough Terrain Scissor Lift',
    'SLYY-GTJZ14': 'Rough Terrain Scissor Lift',
    'SLYY-GTJZ16': 'Rough Terrain Scissor Lift',
    'SLYY-GTJZ20': 'Rough Terrain Scissor Lift',
  };

  if (!product) {
    return <div className="h-screen flex items-center justify-center text-2xl font-bold">Product Not Found</div>;
  }

  const formatSpecKey = (key: string, isImperial: boolean) => {
    let result = key.replace(/([A-Z])/g, ' $1');
    result = result.charAt(0).toUpperCase() + result.slice(1);
    if (isImperial) {
      result = result.replace(' M', ' (ft)').replace(' Kg', ' (lb)');
    } else {
      result = result.replace(' M', ' (m)').replace(' Kg', ' (kg)');
    }
    return result.trim();
  };

  const renderValue = (key: string, val: string | number, isImperial: boolean) => {
    if (val === null || val === undefined) return null;
    const strVal = String(val);
    if (isImperial) {
      if (key.endsWith('M')) {
        return strVal.replace(/\d+(\.\d+)?/g, (match) => (parseFloat(match) * 3.28084).toFixed(1));
      }
      if (key.endsWith('Kg') || key.includes('Load')) {
        return strVal.replace(/\d+(\.\d+)?/g, (match) => Math.round(parseFloat(match) * 2.20462).toString());
      }
    }
    return strVal;
  };

  const categorizeSpec = (key: string) => {
    const k = key.toLowerCase();
    if (k.includes('engine') || k.includes('battery') || k.includes('drive') || k.includes('charger') || k.includes('power') || k.includes('motor') || k.includes('fuel')) return 'Power';
    if (k.includes('length') || k.includes('width') || k.includes('height') || k.includes('weight') || k.includes('clearance') || k.includes('radius') || k.includes('wheelbase') || k.includes('dimension')) {
      if (k.includes('working') || k.includes('platform')) return 'Performance';
      return 'Dimensions';
    }
    return 'Performance';
  };

  const ignoreKeys = ['sku', 'honwayModel', 'matchType', 'note'];
  const availableSpecs = specs 
    ? Object.keys(specs)
        .filter(key => !ignoreKeys.includes(key))
        .map(key => ({ 
          key, 
          label: formatSpecKey(key, isImperial), 
          value: renderValue(key, specs[key], isImperial),
          category: categorizeSpec(key)
        }))
    : [];

  if (availableSpecs.length === 0 && product.workingHeightM) {
    const label = isImperial ? 'Working Height (ft)' : 'Working Height (m)';
    const val = isImperial ? (product.workingHeightM * 3.28084).toFixed(1) : product.workingHeightM;
    availableSpecs.push({ key: 'maxWorkingHeightM', label, value: String(val), category: 'Performance' });
  }

  const specCategories = {
    Performance: availableSpecs.filter(s => s.category === 'Performance'),
    Dimensions: availableSpecs.filter(s => s.category === 'Dimensions'),
    Power: availableSpecs.filter(s => s.category === 'Power'),
  };

  const quickSpecs = availableSpecs.filter(s => 
    s.key.includes('Height') || 
    s.key.includes('Capacity') || 
    s.key.includes('driverType') || 
    s.key.includes('powerType') ||
    s.key.includes('Weight')
  ).slice(0, 4);

  const productTitle = catSlug === 'articulated-boom-lifts' 
    ? (sku?.includes('EV') ? 'Electric Articulated Boom Lift' : 'Diesel Articulated Boom Lift')
    : catSlug === 'telescopic-boom-lifts'
    ? (sku?.includes('EV') ? 'Electric Telescopic Boom Lift' : 'Diesel Telescopic Boom Lift')
    : (sku && scissorSubtitles[sku] ? scissorSubtitles[sku] : 'Aerial Work Platform');

  const productDescription = catSlug === 'articulated-boom-lifts' && sku ? articulatedDescriptions[sku] 
    : catSlug === 'telescopic-boom-lifts' && sku ? telescopicDescriptions[sku] 
    : sku ? scissorDescriptions[sku] : '';

  return (
    <div className="min-h-screen bg-gray-50 pt-[72px] lg:pt-[100px] pb-0 relative font-sans">
      
      {/* Sticky Contact Bar (Desktop) */}
      <div className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 flex-col gap-2 z-40 p-2">
        <a href="https://wa.me/919811803530" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white p-3 rounded-l-lg shadow-lg hover:pr-6 transition-all flex items-center gap-2 group"><MessageCircle size={20}/><span className="hidden group-hover:inline whitespace-nowrap font-bold text-sm ml-2">WhatsApp</span></a>
        <a href="tel:+919811803530" className="bg-[#0F4AA1] text-white p-3 rounded-l-lg shadow-lg hover:pr-6 transition-all flex items-center gap-2 group"><Phone size={20}/><span className="hidden group-hover:inline whitespace-nowrap font-bold text-sm ml-2">Call Now</span></a>
        <a href="mailto:sales@straightline.in" className="bg-[#1D2433] text-white p-3 rounded-l-lg shadow-lg hover:pr-6 transition-all flex items-center gap-2 group"><FileText size={20}/><span className="hidden group-hover:inline whitespace-nowrap font-bold text-sm ml-2">Email Us</span></a>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-[13px] font-medium text-gray-500">
          <Link to="/" className="hover:text-[#0F4AA1] transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to={`/category/${catSlug}`} className="hover:text-[#0F4AA1] transition-colors">Equipment</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-bold">{sku}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        
        {/* Premium Hero Section */}
        <div className="bg-white rounded-[20px] shadow-sm border border-gray-200 p-6 lg:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            
            {/* Left Column: Gallery */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <AnimatePresence mode="wait">
                {/* Main Image with Zoom & Lightbox */}
                <div 
                  className={`relative bg-white rounded-[24px] mb-4 border border-gray-100 overflow-hidden shadow-sm flex items-center justify-center min-h-[400px] lg:min-h-[500px] ${mediaList[activeMedia].type === 'image' ? 'cursor-zoom-in group' : ''}`}
                  onClick={() => {
                    if (mediaList[activeMedia].type === 'image') {
                      setIsLightboxOpen(true);
                    }
                  }}
                >
                  {mediaList[activeMedia].type === 'video' ? (
                    <motion.video 
                      ref={videoRef}
                      key="video" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      src={mediaList[activeMedia].url} 
                      autoPlay 
                      loop 
                      controls
                      playsInline
                      className="w-full h-[400px] lg:h-[500px] object-contain"
                    />
                  ) : (
                    <motion.img 
                      key={mediaList[activeMedia].url} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      src={mediaList[activeMedia].url} 
                      alt={sku} 
                      className="w-full h-[400px] lg:h-[500px] object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  {mediaList[activeMedia].type === 'image' && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full shadow-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 size={20} />
                    </div>
                  )}
                </div>
              </AnimatePresence>
              
              <div className="flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
                {mediaList.map((media, idx) => (
                  <button 
                    key={idx} onClick={() => setActiveMedia(idx)}
                    className={`relative w-24 h-24 rounded-lg flex-shrink-0 overflow-hidden border-2 transition-all bg-gray-50 ${activeMedia === idx ? 'border-[#0F4AA1] shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    {media.type === 'video' ? (
                      <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white"><Play size={24} /></div>
                    ) : (
                      <img src={media.url} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover mix-blend-multiply" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Info & Specs */}
            <div className="lg:col-span-5 flex flex-col">
              <h1 className="text-4xl lg:text-5xl font-[900] tracking-tight text-[#1E293B] mb-2">{sku}</h1>
              <p className="text-lg text-gray-500 font-medium mb-6">{productTitle}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="flex items-center gap-1.5 bg-blue-50 text-[#0F4AA1] px-3 py-1.5 rounded-full text-xs font-bold border border-blue-100"><CheckCircle2 size={14}/> Available in India</span>
                <span className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold border border-green-100"><ShieldCheck size={14}/> Genuine Parts</span>
                <span className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-bold border border-gray-200"><Wrench size={14}/> Ready Stock</span>
              </div>

              <div className="border-t border-gray-100 pt-8 mb-8">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Quick Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {quickSpecs.map((s, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <p className="text-[11px] font-bold text-gray-500 uppercase mb-1">{s.label}</p>
                      <p className="text-lg font-[800] text-[#1E293B] leading-none">{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto mb-[100px] space-y-3">
                <a href={`https://wa.me/919811803530?text=Hi,%20I'm%20interested%20in%20the%20${sku}%20model.%20Could%20you%20share%20the%20pricing%20and%20full%20specs?`} target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] text-white py-4 rounded-xl text-[15px] font-bold flex items-center justify-center gap-2 hover:bg-[#1DA851] transition-all shadow-md hover:shadow-xl transform hover:-translate-y-1">
                  <MessageCircle size={20} /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Content & Specs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 space-y-8">
            
            {/* Description Section */}
            <section className="bg-white p-8 lg:p-10 rounded-[20px] shadow-sm border border-gray-200">
              <h2 className="text-2xl font-[800] text-[#1E293B] mb-6">Product Overview</h2>
              <div className="prose max-w-none text-gray-600 leading-relaxed text-[15px]">
                <p className="mb-8">{productDescription}</p>
                
                <h3 className="text-xl font-[800] text-[#1E293B] mt-10 mb-4">Applications</h3>
                <p className="mb-8">Designed for demanding work environments, the {sku} provides a safe, efficient, and reliable solution for working at height. Its robust chassis, precision controls, and intelligent safety systems make it perfect for prolonged industrial use, offering excellent stability even at maximum extension.</p>
                
                <h3 className="text-xl font-[800] text-[#1E293B] mt-10 mb-4">Advantages</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 list-none p-0">
                  <li className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100"><CheckCircle2 size={18} className="text-[#0F4AA1] shrink-0"/> <span className="font-semibold text-gray-700">High structural stability</span></li>
                  <li className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100"><CheckCircle2 size={18} className="text-[#0F4AA1] shrink-0"/> <span className="font-semibold text-gray-700">Precision hydraulic controls</span></li>
                  <li className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100"><CheckCircle2 size={18} className="text-[#0F4AA1] shrink-0"/> <span className="font-semibold text-gray-700">Extended operational life</span></li>
                  <li className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100"><CheckCircle2 size={18} className="text-[#0F4AA1] shrink-0"/> <span className="font-semibold text-gray-700">Easy access maintenance</span></li>
                  <li className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100"><CheckCircle2 size={18} className="text-[#0F4AA1] shrink-0"/> <span className="font-semibold text-gray-700">Integrated safety systems</span></li>
                  <li className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100"><CheckCircle2 size={18} className="text-[#0F4AA1] shrink-0"/> <span className="font-semibold text-gray-700">Optimized fuel/energy efficiency</span></li>
                </ul>
              </div>
            </section>

            {/* Technical Specifications */}
            <section className="bg-white p-8 lg:p-10 rounded-[20px] shadow-sm border border-gray-200" id="specs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 pb-6 border-b border-gray-100">
                <h2 className="text-3xl lg:text-4xl font-[900] text-[#0F4AA1] tracking-tight uppercase">Technical Specifications</h2>
                
                {/* Metric/Imperial Segmented Control */}
                <div className="flex items-center bg-gray-100 p-1 rounded-xl w-fit">
                  <button onClick={() => setIsImperial(false)} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${!isImperial ? 'bg-white shadow-sm text-[#0F4AA1]' : 'text-gray-500 hover:text-gray-900'}`}>Metric</button>
                  <button onClick={() => setIsImperial(true)} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${isImperial ? 'bg-white shadow-sm text-[#0F4AA1]' : 'text-gray-500 hover:text-gray-900'}`}>Imperial</button>
                </div>
              </div>

              <div className="space-y-8">
                {/* Performance Card */}
                {specCategories.Performance.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="bg-[#f8f9fa] px-6 py-5 border-b border-gray-200 flex items-center gap-3">
                      <Activity size={22} className="text-[#0F4AA1]"/>
                      <h3 className="font-[800] text-[#1E293B] text-[17px] tracking-wide uppercase">Performance</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {specCategories.Performance.map((s, i) => (
                        <div key={i} className="grid grid-cols-[1fr_1fr] sm:grid-cols-[240px_1fr] gap-4 items-center px-6 py-4 hover:bg-gray-50 transition-colors">
                          <span className="text-[#64748b] text-[15px] font-semibold tracking-wide">{s.label}</span>
                          <span className="font-[800] text-[#0f172a] text-[15px]">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dimensions Card */}
                {specCategories.Dimensions.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="bg-[#f8f9fa] px-6 py-5 border-b border-gray-200 flex items-center gap-3">
                      <Ruler size={22} className="text-[#0F4AA1]"/>
                      <h3 className="font-[800] text-[#1E293B] text-[17px] tracking-wide uppercase">Dimensions</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {specCategories.Dimensions.map((s, i) => (
                        <div key={i} className="grid grid-cols-[1fr_1fr] sm:grid-cols-[240px_1fr] gap-4 items-center px-6 py-4 hover:bg-gray-50 transition-colors">
                          <span className="text-[#64748b] text-[15px] font-semibold tracking-wide">{s.label}</span>
                          <span className="font-[800] text-[#0f172a] text-[15px]">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Power Card */}
                {specCategories.Power.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="bg-[#f8f9fa] px-6 py-5 border-b border-gray-200 flex items-center gap-3">
                      <Zap size={22} className="text-[#0F4AA1]"/>
                      <h3 className="font-[800] text-[#1E293B] text-[17px] tracking-wide uppercase">Power & Drive</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {specCategories.Power.map((s, i) => (
                        <div key={i} className="grid grid-cols-[1fr_1fr] sm:grid-cols-[240px_1fr] gap-4 items-center px-6 py-4 hover:bg-gray-50 transition-colors">
                          <span className="text-[#64748b] text-[15px] font-semibold tracking-wide">{s.label}</span>
                          <span className="font-[800] text-[#0f172a] text-[15px]">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Complete Specifications Note */}
              <div className="mt-8 bg-blue-50/50 border border-blue-100 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <h4 className="text-lg font-bold text-[#0F4AA1] mb-1">Need the complete technical specifications?</h4>
                  <p className="text-gray-600 text-[15px]">Contact us on WhatsApp for the full specification sheet and expert assistance.</p>
                </div>
                <a 
                  href={`https://wa.me/919811803530?text=Hi, I would like the complete technical specification sheet for the ${sku} model.`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-lg font-bold text-[15px] flex items-center justify-center gap-2 whitespace-nowrap transition-colors shadow-sm"
                >
                  <MessageCircle size={20} />
                  WhatsApp Us
                </a>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1 space-y-8">
            {/* Industries Served */}
            <section className="bg-white p-8 rounded-[20px] shadow-sm border border-gray-200">
              <h2 className="text-xl font-[800] text-[#1E293B] mb-6">Industries Served</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl border border-gray-100 text-center gap-2 hover:border-[#0F4AA1] hover:bg-blue-50 transition-colors group"><Building2 size={24} className="text-[#0F4AA1] group-hover:scale-110 transition-transform"/><span className="text-xs font-bold text-gray-700">Construction</span></div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl border border-gray-100 text-center gap-2 hover:border-[#0F4AA1] hover:bg-blue-50 transition-colors group"><Warehouse size={24} className="text-[#0F4AA1] group-hover:scale-110 transition-transform"/><span className="text-xs font-bold text-gray-700">Warehouses</span></div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl border border-gray-100 text-center gap-2 hover:border-[#0F4AA1] hover:bg-blue-50 transition-colors group"><Factory size={24} className="text-[#0F4AA1] group-hover:scale-110 transition-transform"/><span className="text-xs font-bold text-gray-700">Factories</span></div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl border border-gray-100 text-center gap-2 hover:border-[#0F4AA1] hover:bg-blue-50 transition-colors group"><Plane size={24} className="text-[#0F4AA1] group-hover:scale-110 transition-transform"/><span className="text-xs font-bold text-gray-700">Airports</span></div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl border border-gray-100 text-center gap-2 hover:border-[#0F4AA1] hover:bg-blue-50 transition-colors group"><HardHat size={24} className="text-[#0F4AA1] group-hover:scale-110 transition-transform"/><span className="text-xs font-bold text-gray-700">Infrastructure</span></div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl border border-gray-100 text-center gap-2 hover:border-[#0F4AA1] hover:bg-blue-50 transition-colors group"><Wrench size={24} className="text-[#0F4AA1] group-hover:scale-110 transition-transform"/><span className="text-xs font-bold text-gray-700">Maintenance</span></div>
              </div>
            </section>
            
            {/* Why StraightLine */}
            <section className="bg-white p-8 rounded-[20px] shadow-sm border border-gray-200">
              <h2 className="text-xl font-[800] text-[#1E293B] mb-6">The StraightLine Advantage</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-lg"><CheckCircle2 size={20} className="text-[#0F4AA1] shrink-0"/><span className="text-[14px] font-bold text-[#1E293B]">Ready Stock & Fast Delivery</span></div>
                <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-lg"><CheckCircle2 size={20} className="text-[#0F4AA1] shrink-0"/><span className="text-[14px] font-bold text-[#1E293B]">Genuine Honway Parts</span></div>
                <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-lg"><CheckCircle2 size={20} className="text-[#0F4AA1] shrink-0"/><span className="text-[14px] font-bold text-[#1E293B]">PAN India Technical Support</span></div>
                <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-lg"><CheckCircle2 size={20} className="text-[#0F4AA1] shrink-0"/><span className="text-[14px] font-bold text-[#1E293B]">Factory-Trained Engineers</span></div>
                <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-lg"><CheckCircle2 size={20} className="text-[#0F4AA1] shrink-0"/><span className="text-[14px] font-bold text-[#1E293B]">Imported CBU Machines</span></div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Product Highlights Banner */}
      <div className="w-full bg-[#1D2433] py-16 mb-20 border-t-4 border-[#0F4AA1]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform"><Package size={32} className="text-white"/></div>
            <h4 className="text-white font-bold text-lg">Ready CBU Inventory</h4>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform"><Settings size={32} className="text-white"/></div>
            <h4 className="text-white font-bold text-lg">Genuine Spare Parts</h4>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform"><Wrench size={32} className="text-white"/></div>
            <h4 className="text-white font-bold text-lg">Technical Support</h4>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform"><ShieldCheck size={32} className="text-white"/></div>
            <h4 className="text-white font-bold text-lg">Warranty Support</h4>
          </div>
        </div>
      </div>

      {/* Inquiry Section */}
      <div className="max-w-7xl mx-auto px-4 mb-24">
        <div className="bg-white rounded-[24px] overflow-hidden shadow-xl border border-gray-200 flex flex-col lg:flex-row relative">
          <div className="p-8 lg:p-16 lg:w-3/5 z-10">
            <h2 className="text-3xl lg:text-4xl font-[900] mb-4 text-[#1E293B]">Need the Right Aerial Work Platform?</h2>
            <p className="text-gray-500 text-lg mb-8 max-w-lg">Get a free consultation and customized quote for the {sku}. Our experts will help you configure the perfect machine for your project.</p>
            
            <form className="space-y-4" onSubmit={handleWhatsAppSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <input required type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F4AA1]/50 focus:border-[#0F4AA1]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F4AA1]/50 focus:border-[#0F4AA1]" />
                <input type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F4AA1]/50 focus:border-[#0F4AA1]" />
              </div>
              <textarea placeholder="Message / Specific Requirements" rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F4AA1]/50 focus:border-[#0F4AA1]"></textarea>
              <button type="submit" className="bg-[#25D366] text-white font-bold text-lg px-10 py-4 rounded-xl hover:bg-[#1DA851] transition-all w-full sm:w-auto shadow-md hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2">
                <MessageCircle size={24} /> WhatsApp Us
              </button>
            </form>
          </div>
          <div className="hidden lg:block lg:w-2/5 relative bg-gray-100">
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10"></div>
            <img src="/assets/telescopic-diesel/telescopic-diesel-1.webp" alt="Equipment" className="w-full h-full object-cover opacity-80 mix-blend-multiply" />
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="border-t border-gray-200 bg-white pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-12 md:gap-24">
          <div className="text-center">
            <h4 className="text-4xl font-[900] text-[#0F4AA1] mb-2">150+</h4>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Machines Delivered</p>
          </div>
          <div className="text-center">
            <h4 className="text-4xl font-[900] text-[#0F4AA1] mb-2">45+</h4>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Business Clients</p>
          </div>
          <div className="text-center">
            <h4 className="text-4xl font-[900] text-[#0F4AA1] mb-2">24/7</h4>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Technical Support</p>
          </div>
          <div className="text-center">
            <h4 className="text-4xl font-[900] text-[#0F4AA1] mb-2">PAN India</h4>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Service Network</p>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button className="absolute top-6 right-6 text-white hover:text-gray-300 z-50 bg-white/10 p-2 rounded-full backdrop-blur transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            {mediaList[activeMedia]?.type === 'video' ? (
              <video controls autoPlay className="max-w-full max-h-[90vh] rounded-lg shadow-2xl" src={mediaList[activeMedia].url} onClick={(e) => e.stopPropagation()} />
            ) : (
              <img src={mediaList[activeMedia]?.url || '/assets/straight-line-logo.webp'} alt={sku} className="max-w-full max-h-[90vh] object-contain drop-shadow-2xl" onClick={(e) => e.stopPropagation()} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Product;
