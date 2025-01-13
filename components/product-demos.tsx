// 'use client';
//
// import { useState, useCallback } from 'react';
// import { motion } from 'framer-motion';
// import { Upload, Eye, AlertCircle } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { useToast } from '@/components/ui/use-toast';
// import { cn } from '@/lib/utils';
// import { useTranslation } from '@/app/i18n/translation-context';
//
// interface FileInfo {
//   name: string;
//   size: number;
//   type: string;
//   url: string;
// }
//
// // Base64 编码函数
// function base64Encode(str: string): string {
//   if (typeof window !== 'undefined') {
//     return btoa(str);
//   }
//   return Buffer.from(str).toString('base64');
// }
//
// export function ProductDemos() {
//   const t = useTranslation();
//   const { toast } = useToast();
//   const [isDragging, setIsDragging] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const [showPreviewDialog, setShowPreviewDialog] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState<string>('');
//   const [selectedFile, setSelectedFile] = useState<FileInfo | null>(null);
//
//   const handleDrag = useCallback((e: React.DragEvent, isDragging: boolean) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(isDragging);
//   }, []);
//
//   const handleFileDrop = useCallback(async (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);
//
//     const file = e.dataTransfer.files[0];
//     if (file) {
//       await handleFileUpload(file);
//     }
//   }, []);
//
//   const handleFileUpload = async (file: File) => {
//     // 检查文件大小限制 (10MB)
//     const maxSize = 10 * 1024 * 1024;
//     if (file.size > maxSize) {
//       toast({
//         title: t.productDemos.filePreview.fileTooLarge,
//         description: t.productDemos.filePreview.fileSizeLimit,
//         variant: "destructive",
//       });
//       return;
//     }
//
//     setIsUploading(true);
//
//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//
//       // 上传文件到指定接口
//       const uploadResponse = await fetch('https://m.allbs.cn/api/upload', {
//         method: 'POST',
//         body: formData,
//       });
//
//       const data = await uploadResponse.json();
//
//       if (data.ok) {
//         const fileInfo: FileInfo = {
//           name: file.name,
//           size: file.size,
//           type: file.type,
//           url: data.data.url,
//         };
//         setSelectedFile(fileInfo);
//
//         // Base64 编码文件 URL
//         const encodedUrl = base64Encode(data.data.url);
//         // 生成预览 URL
//         const previewUrl = `https://preview.allbs.cn/onlinePreview?url=${encodeURIComponent(encodedUrl)}`;
//         setPreviewUrl(previewUrl);
//
//         // 复制预览链接到剪贴板
//         await navigator.clipboard.writeText(previewUrl);
//         toast({
//           title: t.productDemos.filePreview.linkCopied,
//           description: t.productDemos.filePreview.linkCopiedDesc,
//         });
//
//         // 直接在新标签页中打开预览
//         window.open(previewUrl, '_blank');
//       } else {
//         throw new Error(data.message || t.productDemos.filePreview.uploadFailed);
//       }
//     } catch (error) {
//       console.error('上传失败:', error);
//       toast({
//         title: t.productDemos.filePreview.uploadFailed,
//         description: error instanceof Error ? error.message : t.productDemos.filePreview.tryAgain,
//         variant: "destructive",
//       });
//     } finally {
//       setIsUploading(false);
//     }
//   };
//
//   const formatFileSize = (bytes: number) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };
//
//   return (
//     <section className="py-16">
//       <div className="container mx-auto px-4">
//         <Card className="overflow-hidden border-none shadow-lg">
//           <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
//             <CardTitle className="flex items-center gap-2">
//               <Eye className="h-5 w-5" />
//               {t.productDemos.filePreview.title}
//             </CardTitle>
//             <CardDescription>
//               {t.productDemos.filePreview.description}
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="p-6">
//             <div className="space-y-4">
//               <div
//                 className={cn(
//                   "border-2 border-dashed rounded-lg p-8 transition-all duration-200",
//                   isDragging ? "border-primary bg-primary/5 scale-[0.99]" : "border-muted-foreground/25 hover:border-primary/50",
//                   "relative"
//                 )}
//                 onDragOver={(e) => handleDrag(e, true)}
//                 onDragLeave={(e) => handleDrag(e, false)}
//                 onDrop={handleFileDrop}
//               >
//                 <input
//                   type="file"
//                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                   onChange={(e) => {
//                     const file = e.target.files?.[0];
//                     if (file) {
//                       handleFileUpload(file);
//                     }
//                   }}
//                 />
//                 <div className="text-center">
//                   <Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
//                   <p className="mt-2 text-sm text-muted-foreground">
//                     {t.productDemos.filePreview.dragOrClick}
//                   </p>
//                   <p className="mt-1 text-xs text-muted-foreground">
//                     {t.productDemos.filePreview.maxSize}
//                   </p>
//                   <div className="mt-4 text-xs text-muted-foreground space-y-1">
//                     <p>{t.uploadDemos.supportedFormats.title}</p>
//                     <p>{t.uploadDemos.supportedFormats.office}</p>
//                     <p>{t.uploadDemos.supportedFormats.wps}</p>
//                     <p>{t.uploadDemos.supportedFormats.image}</p>
//                     <p>{t.uploadDemos.supportedFormats.document}</p>
//                     <p>{t.uploadDemos.supportedFormats.model}</p>
//                     <p>{t.uploadDemos.supportedFormats.media}</p>
//                     <p>{t.uploadDemos.supportedFormats.archive}</p>
//                   </div>
//                 </div>
//               </div>
//
//               {isUploading && (
//                 <div className="text-center">
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="inline-block"
//                   >
//                     {t.productDemos.filePreview.uploading}
//                   </motion.div>
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </section>
//   );
// }