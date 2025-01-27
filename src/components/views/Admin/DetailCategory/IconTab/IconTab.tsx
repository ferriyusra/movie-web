import InputFile from "@/components/ui/InputFile";
import { Button, Card, CardBody, CardHeader, Skeleton } from "@nextui-org/react";
import Image from "next/image";

interface PropTypes {
  currentIcon: string;
}

const IconTab = (props: PropTypes) => {
  const { currentIcon } = props;
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Kategori ikon</h1>
        <p className="w-full text-small text-default-400">Atur ikon kategori</p>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4" onSubmit={() => { }}>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">
              Ikon saat ini
            </p>
            <Skeleton
              className="aspect-square rounded-lg"
              isLoaded={!!currentIcon}
            >
              <Image src={currentIcon} alt="icon" fill className="!relative" />
            </Skeleton>
          </div>
          <InputFile
            name="icon"
            isDropable
            label={<p className="text-sm font-medium text-default-700 mb-2">Unggah Ikon Baru</p>}
          />
          <Button
            type="submit"
            color="danger"
            className="mt-2 disabled:bg-default-500"
          >Simpan Perubahan</Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default IconTab;
