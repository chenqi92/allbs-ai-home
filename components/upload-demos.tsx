'use client';

import {useState, useCallback} from 'react';
import {motion} from 'framer-motion';
import {
    Upload,
    Eye,
    Image as ImageIcon,
    File,
    FileText,
    Film,
    Music,
    Archive,
    Code,
    Box,
    FileImage
} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {cn} from '@/lib/utils';
import {useTranslation} from '@/app/i18n/translation-context';

interface FileInfo {
    name: string;
    size: number;
    type: string;
    url: string;
}

const fileCategories = {
    office: [
        'doc', 'docx', 'xls', 'xlsx', 'xlsm', 'ppt', 'pptx', 'csv', 'tsv', 'dotm',
        'xlt', 'xltm', 'dot', 'dotx', 'xlam', 'xla', 'wps', 'dps', 'et', 'ett',
        'wpt', 'odt', 'ods', 'ots', 'odp', 'otp', 'six', 'ott', 'fodt', 'fods'
    ],
    diagram: ['vsd', 'vsdx', 'wmf', 'emf', 'xmind', 'bpmn'],
    image: [
        'jpg', 'jpeg', 'png', 'gif', 'bmp', 'ico', 'jfif', 'webp', 'tif', 'tiff',
        'tga', 'svg', 'psd'
    ],
    document: ['pdf', 'ofd', 'rtf', 'eml', 'epub', 'txt', 'xml', 'md'],
    model: [
        'obj', '3ds', 'stl', 'ply', 'gltf', 'glb', 'off', '3dm', 'fbx', 'dae',
        'wrl', '3mf', 'ifc', 'brep', 'step', 'iges', 'fcstd', 'bim', 'dwg', 'dxf'
    ],
    code: ['java', 'php', 'py', 'js', 'css', 'html', 'json', 'yaml', 'xml'],
    archive: ['zip', 'rar', 'jar', 'tar', 'gz', 'gzip', '7z'],
    media: [
        'mp3', 'wav', 'mp4', 'flv', 'avi', 'mov', 'rm', 'webm', 'ts', 'mkv',
        'mpeg', 'ogg', 'mpg', 'rmvb', 'wmv', '3gp', 'swf'
    ]
};

export function UploadDemos() {
    const t = useTranslation();
    const [imageFile, setImageFile] = useState<FileInfo | null>(null);
    const [processedImage, setProcessedImage] = useState<string | null>(null);
    const [generalFile, setGeneralFile] = useState<FileInfo | null>(null);
    const [isDraggingImage, setIsDraggingImage] = useState(false);
    const [isDraggingFile, setIsDraggingFile] = useState(false);

    const handleDrag = (e: React.DragEvent, isDragging: boolean, setIsDragging: (value: boolean) => void) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(isDragging);
    };

    const processImage = async (file: File) => {
        return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                setTimeout(() => {
                    resolve(e.target?.result as string);
                }, 1000);
            };
            reader.readAsDataURL(file);
        });
    };

    const getFileTypeIcon = (fileName: string) => {
        const ext = fileName.split('.').pop()?.toLowerCase() || '';
        if (fileCategories.office.includes(ext)) return <FileText className="h-5 w-5"/>;
        if (fileCategories.image.includes(ext)) return <FileImage className="h-5 w-5"/>;
        if (fileCategories.media.includes(ext)) {
            return ext.match(/^(mp3|wav|ogg)$/) ? <Music className="h-5 w-5"/> : <Film className="h-5 w-5"/>;
        }
        if (fileCategories.archive.includes(ext)) return <Archive className="h-5 w-5"/>;
        if (fileCategories.code.includes(ext)) return <Code className="h-5 w-5"/>;
        if (fileCategories.model.includes(ext)) return <Box className="h-5 w-5"/>;
        return <File className="h-5 w-5"/>;
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
        <section className="py-16 bg-gradient-to-b from-background to-muted/10">
            <div className="container mx-auto px-4 space-y-8">
                {/* General File Upload Demo */}
                <Card className="overflow-hidden border-none shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                        <CardTitle className="flex items-center gap-2">
                            <File className="h-5 w-5"/>
                            {t.uploadDemos.filePreviewTitle}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <div
                                className={cn(
                                    "border-2 border-dashed rounded-lg p-8 transition-all duration-200",
                                    isDraggingFile ? "border-primary bg-primary/5 scale-[0.99]" : "border-muted-foreground/25 hover:border-primary/50",
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
                                    <div className="mt-4 text-xs text-muted-foreground space-y-1">
                                        <p>{t.uploadDemos.supportedFormats.title}</p>
                                        <p>{t.uploadDemos.supportedFormats.office}</p>
                                        <p>{t.uploadDemos.supportedFormats.wps}</p>
                                        <p>{t.uploadDemos.supportedFormats.image}</p>
                                        <p>{t.uploadDemos.supportedFormats.document}</p>
                                        <p>{t.uploadDemos.supportedFormats.model}</p>
                                        <p>{t.uploadDemos.supportedFormats.media}</p>
                                        <p>{t.uploadDemos.supportedFormats.archive}</p>
                                    </div>
                                </div>
                            </div>

                            {generalFile && (
                                <motion.div
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    className="space-y-4"
                                >
                                    <div className="bg-muted/30 rounded-lg p-6">
                                        <div className="flex items-center gap-4">
                                            {getFileTypeIcon(generalFile.name)}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium truncate">{generalFile.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {formatFileSize(generalFile.size)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
                                        <Eye className="mr-2 h-4 w-4"/>
                                        {t.uploadDemos.previewFile}
                                    </Button>
                                </motion.div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}