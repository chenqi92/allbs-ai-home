'use client';

import {useState, useCallback} from 'react';
import {motion} from 'framer-motion';
import {Upload, Download, Image as ImageIcon, File} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {cn} from '@/lib/utils';
import { useTranslation } from '@/app/i18n/translation-context';

interface FileInfo {
    name: string;
    size: number;
    type: string;
    url: string;
}

export function UploadDemos() {
    const [imageFile, setImageFile] = useState<FileInfo | null>(null);
    const [processedImage, setProcessedImage] = useState<string | null>(null);
    const [generalFile, setGeneralFile] = useState<FileInfo | null>(null);
    const [isDraggingImage, setIsDraggingImage] = useState(false);
    const [isDraggingFile, setIsDraggingFile] = useState(false);
    const t = useTranslation();

    const handleDrag = (e: React.DragEvent, isDragging: boolean, setIsDragging: (value: boolean) => void) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(isDragging);
    };

    const processImage = async (file: File) => {
        // Simulate image processing
        return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                setTimeout(() => {
                    resolve(e.target?.result as string);
                }, 1000); // Simulate processing time
            };
            reader.readAsDataURL(file);
        });
    };

    const handleImageDrop = useCallback(async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDraggingImage(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const fileInfo: FileInfo = {
                name: file.name,
                size: file.size,
                type: file.type,
                url: URL.createObjectURL(file)
            };
            setImageFile(fileInfo);
            const processed = await processImage(file);
            setProcessedImage(processed);
        }
    }, []);

    const handleFileDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDraggingFile(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            const fileInfo: FileInfo = {
                name: file.name,
                size: file.size,
                type: file.type,
                url: URL.createObjectURL(file)
            };
            setGeneralFile(fileInfo);
        }
    }, []);

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <section className="py-16">
            <div className="container mx-auto px-4 space-y-8">
                {/* Image Upload Demo */}
                {/*<Card>*/}
                {/*    <CardHeader>*/}
                {/*        <CardTitle className="flex items-center gap-2">*/}
                {/*            <ImageIcon className="h-5 w-5"/>*/}
                {/*            图片背景移除*/}
                {/*        </CardTitle>*/}
                {/*    </CardHeader>*/}
                {/*    <CardContent>*/}
                {/*        <div*/}
                {/*            className={cn(*/}
                {/*                "border-2 border-dashed rounded-lg p-8 transition-colors",*/}
                {/*                isDraggingImage ? "border-primary bg-primary/5" : "border-muted-foreground/25",*/}
                {/*                "relative"*/}
                {/*            )}*/}
                {/*            onDragOver={(e) => handleDrag(e, true, setIsDraggingImage)}*/}
                {/*            onDragLeave={(e) => handleDrag(e, false, setIsDraggingImage)}*/}
                {/*            onDrop={handleImageDrop}*/}
                {/*        >*/}
                {/*            <input*/}
                {/*                type="file"*/}
                {/*                accept="image/*"*/}
                {/*                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"*/}
                {/*                onChange={async (e) => {*/}
                {/*                    const file = e.target.files?.[0];*/}
                {/*                    if (file) {*/}
                {/*                        const fileInfo: FileInfo = {*/}
                {/*                            name: file.name,*/}
                {/*                            size: file.size,*/}
                {/*                            type: file.type,*/}
                {/*                            url: URL.createObjectURL(file)*/}
                {/*                        };*/}
                {/*                        setImageFile(fileInfo);*/}
                {/*                        const processed = await processImage(file);*/}
                {/*                        setProcessedImage(processed);*/}
                {/*                    }*/}
                {/*                }}*/}
                {/*            />*/}
                {/*            <div className="text-center">*/}
                {/*                <Upload className="mx-auto h-12 w-12 text-muted-foreground/50"/>*/}
                {/*                <p className="mt-2 text-sm text-muted-foreground">*/}
                {/*                    拖拽图片到此处或点击上传*/}
                {/*                </p>*/}
                {/*                <p className="text-xs text-muted-foreground mt-1">*/}
                {/*                    支持 JPG、PNG 格式*/}
                {/*                </p>*/}
                {/*            </div>*/}
                {/*        </div>*/}

                {/*        {imageFile && processedImage && (*/}
                {/*            <motion.div*/}
                {/*                initial={{opacity: 0, y: 20}}*/}
                {/*                animate={{opacity: 1, y: 0}}*/}
                {/*                className="mt-6 space-y-4"*/}
                {/*            >*/}
                {/*                <div className="grid grid-cols-2 gap-4">*/}
                {/*                    <div>*/}
                {/*                        <p className="text-sm font-medium mb-2">原始图片</p>*/}
                {/*                        <img*/}
                {/*                            src={imageFile.url}*/}
                {/*                            alt="Original"*/}
                {/*                            className="w-full rounded-lg object-cover"*/}
                {/*                        />*/}
                {/*                    </div>*/}
                {/*                    <div>*/}
                {/*                        <p className="text-sm font-medium mb-2">处理结果</p>*/}
                {/*                        <img*/}
                {/*                            src={processedImage}*/}
                {/*                            alt="Processed"*/}
                {/*                            className="w-full rounded-lg object-cover bg-[url('/checkered-pattern.png')] bg-repeat"*/}
                {/*                        />*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                <Button className="w-full">*/}
                {/*                    <Download className="mr-2 h-4 w-4"/>*/}
                {/*                    下载处理后的图片*/}
                {/*                </Button>*/}
                {/*            </motion.div>*/}
                {/*        )}*/}
                {/*    </CardContent>*/}
                {/*</Card>*/}

                {/* General File Upload Demo */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <File className="h-5 w-5"/>
                            {t.uploadDemos.filePreviewTitle}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div
                            className={cn(
                                "border-2 border-dashed rounded-lg p-8 transition-colors",
                                isDraggingFile ? "border-primary bg-primary/5" : "border-muted-foreground/25",
                                "relative"
                            )}
                            onDragOver={(e) => handleDrag(e, true, setIsDraggingFile)}
                            onDragLeave={(e) => handleDrag(e, false, setIsDraggingFile)}
                            onDrop={handleFileDrop}
                        >
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const fileInfo: FileInfo = {
                                            name: file.name,
                                            size: file.size,
                                            type: file.type,
                                            url: URL.createObjectURL(file)
                                        };
                                        setGeneralFile(fileInfo);
                                    }
                                }}
                            />
                            <div className="text-center">
                                <Upload className="mx-auto h-12 w-12 text-muted-foreground/50"/>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {t.uploadDemos.dragOrClickFile}
                                </p>
                            </div>
                        </div>

                        {generalFile && (
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                className="mt-6 space-y-4"
                            >
                                <div className="bg-muted/50 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <File className="h-5 w-5"/>
                                            <div>
                                                <p className="font-medium">{generalFile.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {formatFileSize(generalFile.size)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-full">
                                    <Download className="mr-2 h-4 w-4"/>
                                    {t.uploadDemos.downloadFile}
                                </Button>
                            </motion.div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}