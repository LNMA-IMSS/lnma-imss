/* ============================================================
   EQUIPMENT CATALOG
   Add/remove/reorder equipment here. Organized by category.
   ============================================================ */
const EQUIPMENT_DATA = {
  "_comment": "EQUIPMENT MANAGEMENT: Add/remove equipment by editing entries below. Images go in assets/images/equipment/. Categories control grouping on the page. To remove equipment, simply delete its entry. To add, copy an existing entry and modify.",
  "categories": {
    "microscopy": {
      "es": "Microscopía",
      "en": "Microscopy"
    },
    "histology": {
      "es": "Histología",
      "en": "Histology"
    },
    "other": {
      "es": "Otro Equipo",
      "en": "Other Equipment"
    }
  },
  "items": [
    {
      "id": "confocal-nikon-a1",
      "category": "microscopy",
      "name": {
        "es": "Confocal Nikon A1",
        "en": "Nikon A1 confocal"
      },
      "image": "assets/images/equipment/confocal-nikon-a1.svg",
      "popupImage": "assets/images/equipment/popup-confocal-nikon-a1.svg",
      "shortDescription": {
        "es": "Microscopio confocal de barrido láser.",
        "en": "Confocal laser scanning microscope."
      },
      "fullDescription": {
        "es": "El confocal Nikon A1 permite la investigación avanzada de muestras vivas y fijadas.",
        "en": "The Nikon A1 confocal microscope enables advanced research on both live and fixed samples."
      },
      "specs": {
        "es": ["Líneas láser: 405 nm, 488 nm, 561 nm, 633 nm", "Rango espectral de detección: 450-740 nm", "Objetivos: 10X/0.5 (dry) 20X/0.75 (dry) 40X/ 1.3 (oil) 60X/ 1.2 (water) 60X/1.4 (oil) 100X/ 1.45 (oil)", "Detectores: 4 Fotomultiplicadores 1 Detector de luz transmitida 1 Detector espectral de 32 canales 1 Hamamatsu ORCA Flash 4.0", "Modalidades: Curso temporal, stitching, reconstrucción 3D y sus combinaciones. A solicitud del usuario se puede incluir el stage top incubator (platina térmica) para visualización de muestras vivas (los consumibles deben ser proporcionados por el usuario).", "Aplicaciones: Adquisición de imágenes en fluorescencia y campo claro. Adquisición de imágenes de muestras vivas, FRET, FRAP."],
        "en": ["Laser lines: 405 nm, 488 nm, 561 nm, 633 nm", "Spectral detection range: 450-740 nm", "Objectives: 10X/0.5 (dry), 20X/0.75 (dry), 40X/1.3 (oil), 60X/1.2 (water), 60X/1.4 (oil), 100X/1.45 (oil)", "Detectors: 4 Photomultipliers, 1 Transmitted light detector, 1 32-channel spectral detector, 1 Hamamatsu ORCA Flash 4.0", "Modalities: Time-lapse, stitching, 3D reconstruction, and their combinations. Upon user request, a stage top incubator can be included for live sample imaging (consumables must be provided by the user).", "Applications: Fluorescence and brightfield image acquisition. Live-cell imaging, FRET, FRAP."]
      }
    },
    {
      "id": "macroscopio-nikon-az100",
      "category": "microscopy",
      "name": {
        "es": "Macroscopio Nikon AZ100",
        "en": "Nikon AZ100 Macro Zoom"
      },
      "image": "assets/images/equipment/macroscopio-nikon-az100.svg",
      "popupImage": "assets/images/equipment/popup-macroscopio-nikon-az100.svg",
      "shortDescription": {
        "es": "Macro-/microscopio multipropósito para aplicaciones biomédicas e industriales",
        "en": "Multi-Purpose Macro/Micro Microscope for Biomedical and Industrial Applications"
      },
      "fullDescription": {
        "es": "El macro-/microscopio Nikon AZ100 Multizoom es un sistema de alto rendimiento que ofrece capacidades que no existen actualmente en los microscopios estereoscópicos ni en los microscopios compuestos de gran aumento.",
        "en": "The Nikon AZ100 Multizoom is a high performance system that provides macro/micro capabilities that don't currently exist with stereo zoom microscopes and compound high magnification microscopes."
      },
      "specs": {
        "es": ["Tipo de sistema: Recto", "Lineas de excitación: 405 nm, 488 nm, 561 nm, 633 nm", "Rangos de detección: 450/50nm, 525/50nm, 600/50nm, 700-740 nm", "Objetivos: AZ-Plan APO 1x Objective, N.A. 0.10, W.D. 35mm.<br>AZ-Plan FLUOR 2x Objective, N.A. 0.2, W.D. 45mm.<br>AZ-Plan APO 4x Objective, N.A. 0.4, W.D. 20mm.", "Detector: Cámara DS-Fi3 5.9MP Color CMOS (no permite separar canales)", "Aplicaciones: Macroscopio para observación y toma de fotografías de muestras grandes (en modos epifluorescencia y campo claro)"],
        "en": ["System type: Upright", "Excitation lines: 405 nm, 488 nm, 561 nm, 633 nm", "Detection ranges: 450/50nm, 525/50nm, 600/50nm, 700-740 nm", "Objectives: AZ-Plan APO 1x Objective, N.A. 0.10, W.D. 35mm.<br>AZ-Plan FLUOR 2x Objective, N.A. 0.2, W.D. 45mm.<br>AZ-Plan APO 4x Objective, N.A. 0.4, W.D. 20mm.", "Detector: DS-Fi3 5.9MP Color CMOS Camera (does not allow channel separation)", "Applications: observation and photographing large samples (in epifluorescence and brightfield modes)"]
      }
    },
    {
      "id": "microscopio-zeiss-axioskop2",
      "category": "microscopy",
      "name": {
        "es": "Microscopio Zeiss Axioskop-2",
        "en": "Zeiss Axioskop-2 Microscope"
      },
      "image": "assets/images/equipment/microscopio-zeiss-axioskop2.svg",
      "popupImage": "assets/images/equipment/popup-microscopio-zeiss-axioskop2.svg",
      "shortDescription": {
        "es": "Microscopio de investigación con campo claro, contraste de fases y epifluorescencia.",
        "en": "Research microscope with brightfield, phase contrast, and epifluorescence."
      },
      "fullDescription": {
        "es": "El Zeiss Axioskop-2 es un microscopio vertical de investigación que ofrece múltiples técnicas de contraste incluyendo campo claro, campo oscuro y contraste de fases. Es ideal para la observación histológica de rutina y la documentación fotográfica de muestras biológicas.",
        "en": "The Zeiss Axioskop-2 is an upright research microscope offering multiple contrast techniques including brightfield, darkfield and phase contrast. Ideal for routine histological observation and photographic documentation of biological samples."
      },
      "specs": {
        "es": ["Tipo de sistema: Recto", "Objetivos: Fluar 5x / 0.15.<br>AchroPlan 10x / 0.25.<br>Plan-NeoFluar 20x / 0.50.<br>EC Plan-NeoFluar 40x / 0.75.<br>Plan-NeoFluar 100x / 1.30 (oil)", "Detector: Cámara DS-Fi3 5.9MP Color CMOS (no permite separar canales)", "Aplicaciones: observación y toma de fotografías de muestras en campo claro"],
        "en": ["System type: Upright", "Objectives: Fluar 5x / 0.25. Infinity/0.17<br>Plan-NeoFluar 10x / 0.30. Infinity/0.17<br>Plan-NeoFluar 20x / 0.50. Infinity/0.17<br>Plan-NeoFluar 40x / 1.3. Infinity/0.17<br>Plan-NeoFluar 63x / 1.25. Infinity/0.17 (oil)<br>Plan-NeoFluar 100x / 1.30 Oil Immersion. Infinity/0.17 (oil)", "Detector: DS-Fi3 5.9MP Color CMOS Camera (does not allow channel separation)", "Applications: observation and brightfield photography of samples"]
      }
    },
    {
      "id": "escaner-kfbio-cc-fl",
      "category": "microscopy",
      "name": {
        "es": "Escáner de Laminillas KFBIO KF-FL-400 (campo claro y fluorescencia)",
        "en": "Slide Scanner KFBIO KF-FL-400 (bright field and fluorescence)"
      },
      "image": "assets/images/equipment/escaner-kfbio-cc-fl.svg",
      "popupImage": "assets/images/equipment/popup-escaner-kfbio-cc-fl.svg",
      "shortDescription": {
        "es": "Escáner de laminillas de alto rendimiento para digitalización de muestras en campo claro y fluorescencia.",
        "en": "High-throughput bright field and fluorescence slide scanner."
      },
      "fullDescription": {
        "es": "El KFBIO KF-FL-400 es un escáner de laminillas de alto rendimiento. Permite el escaneo automatizado de muestras teñidas con técnicas de inmunohistoquímica e inmunofluorescencia.",
        "en": "The KFBIO KF-FL-400 is a high-throughput slide scanner. It allows automated scanning of samples stained with immunohistochemistry and immunofluorescence techniques."
      },
      "specs": {
        "es": ["Fuente de luz: LED", "Número de canales: Hasta 6. Exc-Em (nm): 350/50-460/50, 495/25-537/29, 546/10-572/23, 580/25-625/30, 630/20-667/30, 710/75-810/90", "Capacidad: 400 laminillas (campo claro y fluorescencia)", "Magnificación: Campo claro: 20x y 40x con lente de magnificación adicional. Fluorescencia: 40x únicamente", "Formatos de salida: Campo claro: *.svs, *.tiff, *.kfb, *.dcm. Fluorescencia: *.qptiff, *.kfbf", "<u><a href=\"https://kfbiopathology.com/kf-fl-series/kf-fl-400/\" target=\"_blank\">Descripción</a></u>"],
        "en": ["Light source: LED", "Number of channels: Up to 6. Exc-Em (nm): 350/50-460/50, 495/25-537/29, 546/10-572/23, 580/25-625/30, 630/20-667/30, 710/75-810/90", "Capacity: 400 slides (brightfield and fluorescence)", "Magnification: Brightfield: 20x and 40x with an additional magnification lens. Fluorescence: 40x only", "Output formats: Brightfield: *.svs, *.tiff, *.kfb, *.dcm. Fluorescence: *.qptiff, *.kfbf", "<u><a href=\"https://kfbiopathology.com/kf-fl-series/kf-fl-400/\" target=\"_blank\">Description</a></u>"]
      }
    },
    {
      "id": "escaner-leica-aperio-fl",
      "category": "microscopy",
      "name": {
        "es": "Escáner de Laminillas Leica Aperio FL (fluorescencia)",
        "en": "Leica Aperio FL Slide Scanner (fluorescence)"
      },
      "image": "assets/images/equipment/escaner-leica-aperio-fl.svg",
      "popupImage": "assets/images/equipment/popup-escaner-leica-aperio-fl.svg",
      "shortDescription": {
        "es": "Escáner de laminillas de fluorescencia para digitalización de muestras.",
        "en": "Fluorescence slide scanner for sample digitization."
      },
      "fullDescription": {
        "es": "El Leica Aperio FL es un escáner de laminillas de fluorescencia de rendimiento medio para la digitalización de muestras de tejidos marcados con fluorocromos. Permite el escaneo semi-automatizado de 5 laminillas por corrida.",
        "en": "The Leica Aperio FL is a medium-performance fluorescence slide scanner for digitizing tissue slices labeled with fluorochromes. It allows semi-automated scanning of 5 slides per run."
      },
      "specs": {
        "es": ["Fuente de luz: lámpara de mercurio", "Número de canales: Hasta 4 (DAPI o equivalente, AF488 o equivalente, AF594 o equivalente, AF647 o equivalente)", "Capacidad: 5 laminillas por corrida", "Objetivos: 20x/0.75 Plan Apo (y 40x con lente de magnificación adicional).", "Formato de salida: *.svs"],
        "en": ["Light source: mercury lamp", "Number of channels: Up to 4 (DAPI or equivalent, AF488 or equivalent, AF594 or equivalent, AF647 or equivalent)", "Capacity: 5 slides per run", "Objectives: 20x/0.75 Plan Apo (and 40x with additional magnification lens).", "Output format: *.svs"]
      }
    },
    {
      "id": "escaner-leica-aperio-cs",
      "category": "microscopy",
      "name": {
        "es": "Escáner de Laminillas Leica Aperio CS (campo claro)",
        "en": "Leica Aperio CS Slide Scanner (bright field)"
      },
      "image": "assets/images/equipment/escaner-leica-aperio-cs.svg",
      "popupImage": "assets/images/equipment/popup-escaner-leica-aperio-cs.svg",
      "shortDescription": {
        "es": "Escáner de laminillas de campo claro para patología digital.",
        "en": "Brightfield slide scanner for digital pathology."
      },
      "fullDescription": {
        "es": "El Leica Aperio CS es un escáner de laminillas de campo claro diseñado para la digitalización a velocidad media de muestras con tinciones colorimétricas. Puede ser usado para patología digital y digitalización de muestras. Incluye software de gestión y análisis de imágenes.",
        "en": "The Leica Aperio CS is a brightfield slide scanner designed for medium-speed digitization of samples with colorimetric stains. It can be used for digital pathology and sample digitization. It includes image management and analysis software."
      },
      "specs": {
        "es": ["Capacidad: 5 laminillas por corrida", "Tiempo aproximado de escaneo: 5 min/laminilla (a 20x)", "Objetivos: 20x/0.75 Plan Apo (y 40x con lente de magnificación adicional).", "Formato de salida: *.svs"],
        "en": ["Capacity: 5 slides per run", "Approximate scan time: 5 min/slide (at 20x)", "Objectives: 20x/0.75 Plan Apo (and 40x with additional magnification lens).", "Output format: *.svs"]
      }
    },
    {
      "id": "campana-vibratomo",
      "category": "histology",
      "name": {
        "es": "Campana BioSan UVT-S-AR y vibratomo Compresstome VF-300",
        "en": "BioSan UVT-S-AR cabinet and Compresstome VF-300 vibratome"
      },
      "image": "assets/images/equipment/campana-vibratomo.svg",
      "popupImage": "assets/images/equipment/popup-campana-vibratomo.svg",
      "shortDescription": {
        "es": "Sistema de corte de tejido fresco mediante vibración para secciones gruesas.",
        "en": "Fresh tissue cutting system using vibration for thick sections."
      },
      "fullDescription": {
        "es": "Sistema compuesto por una campana de extracción y un vibratomo para el corte de tejidos frescos o fijados sin necesidad de congelación ni inclusión en parafina. Permite obtener secciones de tejido de 10 a 300 µm de espesor, ideales para estudios de clarificación de tejidos, cultivo de tejidos y electrofisiología.",
        "en": "System composed of an extraction hood and vibratome for cutting fresh or fixed tissues without the need for freezing or paraffin embedding. Allows tissue sections of 10 to 300 µm thickness, ideal for tissue clearing studies, tissue culture, and electrophysiology."
      },
      "specs": {
        "es": ["Campana BioSan UVT-S-AR DNA/RNA UV-cleaner box: <u><a href=\"https://biosan.lv/products/uvt-s-ar-display/\" target=\"_blank\">Descripción</a></u>", "Compresstome VF-300 Tissue Slicer: <u><a href=\"https://precisionary.com/compresstomes/\" target=\"_blank\">Descripción</a></u> y <u><a href=\"https://www.youtube.com/watch?v=emF6-oFPJE0\" target=\"_blank\">Operación</a></u>", "Aplicaciones: Biología molecular y obtención de muestras de tejidos vivos para cultivo."],
        "en": ["Cabinet BioSan UVT-S-AR DNA/RNA UV-cleaner box: <u><a href=\"https://biosan.lv/products/uvt-s-ar-display/\" target=\"_blank\">Description</a></u>", "Compresstome VF-300 Tissue Slicer: <u><a href=\"https://precisionary.com/compresstomes/\" target=\"_blank\">Description</a></u>, <u><a href=\"https://www.youtube.com/watch?v=emF6-oFPJE0\" target=\"_blank\">Operation</a></u>", "Applications: Molecular biology and obtaining living tissue samples for culture."]
      }
    },
    {
      "id": "centro-inclusion-leica-arcadia",
      "category": "histology",
      "name": {
        "es": "Centro de Inclusión HistoCore Leica Arcadia",
        "en": "Leica HistoCore Arcadia Embedding Center"
      },
      "image": "assets/images/equipment/centro-inclusion-leica-arcadia.svg",
      "popupImage": "assets/images/equipment/popup-centro-inclusion-leica-arcadia.svg",
      "shortDescription": {
        "es": "Estación de inclusión de tejidos en parafina.",
        "en": "Tissue embedding workstation."
      },
      "fullDescription": {
        "es": "El sistema modular de inclusión de tejidos HistoCore Arcadia incorpora dos productos independientes: la estación de trabajo de inclusión en caliente Arcadia H y la placa de enfriamiento Arcadia C.",
        "en": "The HistoCore Arcadia modular tissue embedding system incorporates two independent products, the Arcadia H heated embedding workstation and the Arcadia C cold plate."
      },
      "specs": {
        "es": ["Módulo de calentamiento y enfriamiento (con capacidad para 65 cassettes)", "Dispensador de parafina", "Placa fría integrada", "Iluminación LED"],
        "en": ["Heating and cooling module (capacity: 65 embedding cassettes)", "Paraffin dispenser", "Integrated cold plate", "LED illumination"]
      }
    },
    {
      "id": "microtomo-bano-flotacion",
      "category": "histology",
      "name": {
        "es": "Microtomo Leica HistoCore Biocut y Baño de Flotación Leica HistoCore Water Bath M",
        "en": "HistoCore BIOCUT — Manual Rotary Microtome and Leica HistoCore Water Bath M"
      },
      "image": "assets/images/equipment/microtomo-bano-flotacion.svg",
      "popupImage": "assets/images/equipment/popup-microtomo-bano-flotacion.svg",
      "shortDescription": {
        "es": "Microtomo rotatorio con baño de flotación para cortes histológicos finos.",
        "en": "Rotary microtome with flotation bath for fine histological sections."
      },
      "fullDescription": {
        "es": "Micrótomo ergonómico para microtomía manual de alta velocidad y confort, y baño de flotación con visibilidad y eficiencia mejoradas.",
        "en": "Ergonomic microtome for high-speed and comfort manual microtomy adn water bath with enhanced visibility and efficiency."
      },
      "specs": {
        "es": ["Espesor de corte: 1–60 µm", "Retracción automática de la muestra", "Portacuchillas compatible con cuchillas desechables"],
        "en": ["Cutting thickness: 1–60 µm", "Automatic sample retraction", "Blade holder compatible with disposable blades"]
      }
    },
    {
      "id": "centrifuga-refrigerada",
      "category": "other",
      "name": {
        "es": "Centrífuga Refrigerada Gyrozen 1580",
        "en": "Refrigerated Centrifuge Gyrozen 1580"
      },
      "image": "assets/images/equipment/centrifuga-refrigerada.svg",
      "popupImage": "assets/images/equipment/popup-centrifuga-refrigerada.svg",
      "shortDescription": {
        "es": "Centrífuga refrigerada para separación de muestras biológicas.",
        "en": "Temperature-controlled centrifuge for biological sample separation."
      },
      "fullDescription": {
        "es": "Centrífuga refrigerada de alta capacidad sin control de temperatura. Permite la separación de componentes celulares, la preparación de muestras para análisis y el procesamiento de grandes volúmenes de material biológico bajo condiciones controladas de temperatura.",
        "en": "High-capacity refrigerated centrifuge without temperature control. It allows for the separation of cellular components, sample preparation for analysis, and the processing of large volumes of biological material under controlled temperature conditions."
      },
      "specs": {
        "es": ["Rotores para tubos Eppendorf de 1.5 y 2 mL, y para tubos Falcon de 15 mL.", "<u><a href=\"https://gyrozen.com/detail.php?idx=63\" target=\"_blank\">Descripción</a></u>"],
        "en": ["Rotors for 1.5 and 2 mL Eppendorf tubes; and for 15mL Falcon tubes.", "<u><a href=\"https://gyrozen.com/detail.php?idx=63\" target=\"_blank\">Description</a></u>"]
      }
    },
    {
      "id": "incubadora",
      "category": "other",
      "name": {
        "es": "Incubadora de cultivo BIOBASE BJPX-C50",
        "en": "BIOBASE BJPX-C50 cell culture incubator"
      },
      "image": "assets/images/equipment/incubadora.svg",
      "popupImage": "assets/images/equipment/popup-incubadora.svg",
      "shortDescription": {
        "es": "Incubadora de temperatura controlada para cultivo celular.",
        "en": "Temperature-controlled cell culture incubator."
      },
      "fullDescription": {
        "es": "Incubadora de dióxido de carbono (CO2) que proporciona condiciones óptimas de crecimiento y prevención de contaminación para cultivos celulares y de tejidos.",
        "en": "Carbon dioxide (CO2) incubator providing optimal growing conditions and contamination prevention for cell and tissue cultures."
      },
      "specs": {
        "es": ["Rango de temperatura: 5~60°C", "Temporizador programable (0~999h) u operación contínua.", "Rango CO2: 0~20vol%.", "Esterilización por UV incorporada.", "<u><a href=\"https://www.biobase.cc/CO2-Incubator-BJPX-C-pd41086305.html\" target=\"_blank\">Descripción</a></u>"],
        "en": ["Temperature range: 5~60°C.", "Programmable timer (0~999h) or continuous operation.", "CO2 range: 0~20vol%.", "Built-in UV sterilization.", "<u><a href=\"https://www.biobase.cc/CO2-Incubator-BJPX-C-pd41086305.html\" target=\"_blank\">Description</a></u>"]
      }
    },
    {
      "id": "impresora-3d",
      "category": "other",
      "name": {
        "es": "Impresora 3D Zortrax M200",
        "en": "Zortrax M200 3D Printer"
      },
      "image": "assets/images/equipment/impresora-3d.svg",
      "popupImage": "assets/images/equipment/popup-impresora-3d.svg",
      "shortDescription": {
        "es": "Impresora 3D para manufactura aditiva de dispositivos de laboratorio.",
        "en": "3D printer for additive manufacture of laboratory components."
      },
      "fullDescription": {
        "es": "Impresora 3D de escritorio de alto rendimiento utilizada para la producción de dispositivos de laboratorio personalizados, portaobjetos y herramientas auxiliares para la investigación. Inlcuye el software Z-SUITE 2 para la preparación de los modelos para impresión.",
        "en": "Workhorse desktop 3D printer used for the production of custom laboratory devices, sample holders, and auxiliary tools for research. Includes the Z-SUITE 2 slicing software for model preparation process."
      },
      "specs": {
        "es": ["Acepta gran variedad de materiales (Z-ABS, Z-HIPS, Z-ULTRAT, Z-PETG, Z-GLASS, Z-ESD, Z-PLA Pro, Z-ASA Pro, Z-PCABS); compatible con filamentos de terceros", "Alta precisión dimensional", "Incluye software de procesamiento de modelos Z-SIUTE 2", "<u><a href=\"https://zortrax.com/3d-printers/m200-/\" target=\"_blank\">Descripción</a></u>"],
        "en": ["Accepts large number of materials (Z-ABS , Z-HIPS , Z-ULTRAT , Z-PETG , Z-GLASS , Z-ESD , Z-PLA Pro , Z-ASA Pro , Z-PCABS); compatibility with third-party filaments", "High dimensional accuracy", "Includes Z-SUITE 2 slicing software", "<u><a href=\"https://zortrax.com/3d-printers/m200-/\" target=\"_blank\">Description</a></u>"]
      }
    }
  ]
};
