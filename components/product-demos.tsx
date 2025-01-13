// 'use client';
//
// import {useState, useRef, useEffect} from 'react';
// import {motion} from 'framer-motion';
// import Webcam from 'react-webcam';
// import * as cocoSsd from '@tensorflow-models/coco-ssd';
// import * as tf from '@tensorflow/tfjs';
// import {Upload, Download, Camera} from 'lucide-react';
// import {Button} from '@/components/ui/button';
// import {Slider} from '@/components/ui/slider';
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from '@/components/ui/select';
// import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
//
// const idPhotoSizes = [
//     {value: '1inch', label: '1寸 (25×35mm)'},
//     {value: '2inch', label: '2寸 (35×49mm)'},
//     {value: 'passport', label: '护照 (33×48mm)'},
//     {value: 'visa', label: '签证 (33×48mm)'},
// ];
//
// export function ProductDemos() {
//     const [activeTab, setActiveTab] = useState('bg-removal');
//     const [bgImage, setBgImage] = useState<string | null>(null);
//     const [sliderPosition, setSliderPosition] = useState(50);
//     const [idPhotoSize, setIdPhotoSize] = useState('1inch');
//     const [idPhotoImage, setIdPhotoImage] = useState<string | null>(null);
//     const [detections, setDetections] = useState<any[]>([]);
//     const [isWebcamActive, setIsWebcamActive] = useState(false);
//
//     const webcamRef = useRef<Webcam>(null);
//     const canvasRef = useRef<HTMLCanvasElement>(null);
//     const modelRef = useRef<cocoSsd.ObjectDetection | null>(null);
//
//     useEffect(() => {
//         if (activeTab === 'object-detection' && isWebcamActive) {
//             loadModel();
//         }
//     }, [activeTab, isWebcamActive]);
//
//     const loadModel = async () => {
//         try {
//             await tf.ready();
//             modelRef.current = await cocoSsd.load();
//             if (isWebcamActive) {
//                 detectObjects();
//             }
//         } catch (error) {
//             console.error('Error loading model:', error);
//         }
//     };
//
//     const detectObjects = async () => {
//         if (!modelRef.current || !webcamRef.current?.video || !canvasRef.current) return;
//
//         const video = webcamRef.current.video;
//         const canvas = canvasRef.current;
//         const context = canvas.getContext('2d');
//         if (!context) return;
//
//         const detectFrame = async () => {
//             if (modelRef.current && video.readyState === 4) {
//                 const predictions = await modelRef.current.detect(video);
//                 setDetections(predictions);
//
//                 // Draw video frame
//                 context.drawImage(video, 0, 0, canvas.width, canvas.height);
//
//                 // Draw detections
//                 predictions.forEach(prediction => {
//                     const [x, y, width, height] = prediction.bbox;
//                     context.strokeStyle = '#00ff00';
//                     context.lineWidth = 2;
//                     context.strokeRect(x, y, width, height);
//                     context.fillStyle = '#00ff00';
//                     context.fillText(
//                         `${prediction.class} ${Math.round(prediction.score * 100)}%`,
//                         x,
//                         y > 10 ? y - 5 : 10
//                     );
//                 });
//             }
//             requestAnimationFrame(detectFrame);
//         };
//
//         detectFrame();
//     };
//
//     const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
//         const file = e.target.files?.[0];
//         if (!file) return;
//
//         if (file.size > 5 * 1024 * 1024) {
//             alert('文件大小不能超过5MB');
//             return;
//         }
//
//         const reader = new FileReader();
//         reader.onload = (event) => {
//             const dataUrl = event.target?.result as string;
//             if (type === 'bg-removal') {
//                 setBgImage(dataUrl);
//             } else if (type === 'id-photo') {
//                 setIdPhotoImage(dataUrl);
//             }
//         };
//         reader.readAsDataURL(file);
//     };
//
//     return (
//         <section className="py-16 bg-muted/30">
//             <div className="container mx-auto px-4">
//                 <h2 className="text-3xl font-bold text-center mb-12">产品体验区</h2>
//
//                 <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
//                     <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto">
//                         <TabsTrigger value="bg-removal">智能抠图</TabsTrigger>
//                         <TabsTrigger value="id-photo">证件照制作</TabsTrigger>
//                         <TabsTrigger value="object-detection">实时物体识别</TabsTrigger>
//                     </TabsList>
//
//                     <TabsContent value="bg-removal" className="space-y-4">
//                         <div className="bg-card rounded-lg p-6">
//                             <div className="flex justify-center mb-4">
//                                 <Button className="relative">
//                                     <input
//                                         type="file"
//                                         accept=".jpg,.jpeg,.png"
//                                         onChange={(e) => handleImageUpload(e, 'bg-removal')}
//                                         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                                     />
//                                     <Upload className="mr-2 h-4 w-4"/>
//                                     上传图片
//                                 </Button>
//                             </div>
//
//                             {bgImage && (
//                                 <div className="space-y-4">
//                                     <div className="relative h-[400px] overflow-hidden rounded-lg">
//                                         <img
//                                             src={bgImage}
//                                             alt="Original"
//                                             className="absolute top-0 left-0 w-full h-full object-contain"
//                                         />
//                                         <div
//                                             className="absolute top-0 right-0 w-full h-full bg-transparent"
//                                             style={{
//                                                 clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`,
//                                             }}
//                                         >
//                                             <div
//                                                 className="w-full h-full bg-[url('/checkered-pattern.png')] bg-repeat"/>
//                                         </div>
//                                         <div
//                                             className="absolute top-0 w-1 h-full bg-white cursor-col-resize"
//                                             style={{left: `${sliderPosition}%`}}
//                                             onMouseDown={() => {
//                                                 const handleMove = (e: MouseEvent) => {
//                                                     const rect = e.currentTarget?.getBoundingClientRect();
//                                                     if (rect) {
//                                                         const x = e.clientX - rect.left;
//                                                         const newPosition = (x / rect.width) * 100;
//                                                         setSliderPosition(Math.max(0, Math.min(100, newPosition)));
//                                                     }
//                                                 };
//                                                 document.addEventListener('mousemove', handleMove);
//                                                 document.addEventListener('mouseup', () => {
//                                                     document.removeEventListener('mousemove', handleMove);
//                                                 }, {once: true});
//                                             }}
//                                         />
//                                     </div>
//                                     <Button className="w-full">
//                                         <Download className="mr-2 h-4 w-4"/>
//                                         下载结果
//                                     </Button>
//                                 </div>
//                             )}
//                         </div>
//                     </TabsContent>
//
//                     <TabsContent value="id-photo" className="space-y-4">
//                         <div className="bg-card rounded-lg p-6">
//                             <div className="flex flex-col items-center space-y-4">
//                                 <Button className="relative">
//                                     <input
//                                         type="file"
//                                         accept=".jpg,.jpeg,.png"
//                                         onChange={(e) => handleImageUpload(e, 'id-photo')}
//                                         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                                     />
//                                     <Upload className="mr-2 h-4 w-4"/>
//                                     上传照片
//                                 </Button>
//
//                                 <Select value={idPhotoSize} onValueChange={setIdPhotoSize}>
//                                     <SelectTrigger className="w-[200px]">
//                                         <SelectValue placeholder="选择证件照规格"/>
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         {idPhotoSizes.map((size) => (
//                                             <SelectItem key={size.value} value={size.value}>
//                                                 {size.label}
//                                             </SelectItem>
//                                         ))}
//                                     </SelectContent>
//                                 </Select>
//
//                                 {idPhotoImage && (
//                                     <div className="space-y-4 w-full">
//                                         <div
//                                             className="relative aspect-[3/4] max-w-sm mx-auto overflow-hidden rounded-lg">
//                                             <img
//                                                 src={idPhotoImage}
//                                                 alt="ID Photo Preview"
//                                                 className="w-full h-full object-cover"
//                                             />
//                                         </div>
//                                         <Button className="w-full">
//                                             <Download className="mr-2 h-4 w-4"/>
//                                             一键下载
//                                         </Button>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </TabsContent>
//
//                     <TabsContent value="object-detection" className="space-y-4">
//                         <div className="bg-card rounded-lg p-6">
//                             <div className="flex flex-col items-center space-y-4">
//                                 {!isWebcamActive ? (
//                                     <Button onClick={() => setIsWebcamActive(true)}>
//                                         <Camera className="mr-2 h-4 w-4"/>
//                                         开启摄像头
//                                     </Button>
//                                 ) : (
//                                     <div className="space-y-4 w-full">
//                                         <div className="relative aspect-video max-w-3xl mx-auto">
//                                             <Webcam
//                                                 ref={webcamRef}
//                                                 className="absolute inset-0 w-full h-full object-contain rounded-lg"
//                                             />
//                                             <canvas
//                                                 ref={canvasRef}
//                                                 className="absolute inset-0 w-full h-full"
//                                             />
//                                         </div>
//                                         <div className="max-w-sm mx-auto">
//                                             <h3 className="font-semibold mb-2">识别结果：</h3>
//                                             <ul className="space-y-1">
//                                                 {detections.map((detection, index) => (
//                                                     <li key={index} className="flex justify-between">
//                                                         <span>{detection.class}</span>
//                                                         <span>{Math.round(detection.score * 100)}%</span>
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </TabsContent>
//                 </Tabs>
//             </div>
//         </section>
//     );
// }